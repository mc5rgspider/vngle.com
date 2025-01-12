/**
 * Run during site build process to control site's data in GraphQL data layer.
 * Generate pages for front pages, hot topics, and stories.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

// taken manually from aws-video-exports. How to require this?
const awsOutputVideo =
  "storyvodstreams-prod-output-20awcmcv7zuz.s3.us-east-1.amazonaws.com";

/**
 * Gatsby Node API to tell plugins to add pages
 * createPages() calls functions that asynchronously fetch data needed to create pages
 * and waits for all data to be fetched (Promise.all)
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info
 * @param {function} graphql Function to create a GraphQL query to fetch data from Gatsby data layer
 * @param {function} actions Gatsby built-in object containing functions to manipulate website state
 */
exports.createPages = async ({ graphql, actions }) => {
  await Promise.all([
    createStories(graphql, actions),
    createContentful(graphql, actions),
  ]);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@views": path.resolve(__dirname, "src/views"),
        "@templates": path.resolve(__dirname, "src/templates"),
        "@src": path.resolve(__dirname, "src"),
        "@images": path.resolve(__dirname, "src/images"),
      },
    },
  });
};

const createStories = async (graphql, { createPage }) => {
  let items = [];
  let nextToken = "init";

  while (nextToken !== null) {
    const nextTokenStr =
      nextToken !== "init" ? `(nextToken: "${nextToken}")` : "";
    const {
      data: {
        allStory: {
          listVodAssets: { nextToken: newNextToken, items: newItems },
        },
      },
    } = await graphql(`
      {
        allStory {
          listVodAssets${nextTokenStr} {
            nextToken
            items {
              author
              caption
              id
              tags
              title
              createdAt
              video {
                id
              }
            }
          }
        }
      }
    `);

    // update nextToken
    nextToken = newNextToken;
    items = [...items, ...newItems].map((item) => {
      return {
        ...item,
        src: `https://${awsOutputVideo}/${item.video.id}/${item.video.id}.m3u8`,
        type: "application/x-mpegURL",
      };
    });
  }

  await Promise.all(
    items.map((item) => {
      createPage({
        path: `/stories/${item.id}`,
        component: require.resolve(`./src/templates/story`),
        context: item,
      });
    })
  );
};

/**
 * Async function to create pages from Contentful content models (Front Page, Campaign, Story)
 *
 * @param {function} graphql Function to create a GraphQL query to fetch data from Gatsby data layer
 * @param {function} createPage Function to create a page. Destructured from Gatsby's built-in actions object
 */
const createContentful = async (graphql, { createPage }) => {
  /**
   * Fetch all necessary data to populate pages
   * Create 3 arrays of GraphQL data node objects
   */
  const {
    data: {
      allContentfulFrontPage: { nodes: frontPages },
    },
  } = await graphql(`
    {
      allContentfulFrontPage {
        nodes {
          cityId
          id
          slug
          cityName
          coverImage {
            file {
              url
            }
          }
          state
        }
      }
    }
  `);

  await Promise.all(
    frontPages.map(({ cityId, cityName, coverImage, id, state, slug }) => {
      createPage({
        path: `${slug}`,
        component: require.resolve(`./src/templates/frontPage`),
        context: {
          cityId,
          cityName,
          coverImage,
          id,
          state,
        },
      });
    })
  );
};
