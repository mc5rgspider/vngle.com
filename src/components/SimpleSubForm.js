/**
 * Simple subscription form that only gets the user's email and
 * redirects them to a separate Mailchimp subscription page for more info
 */

import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const SimpleSubForm = () => {
  return (
    <Form
      action={process.env.GATSBY_MAILCHIMP_URL}
      method="post"
      target="_blank"
      rel="noreferrer"
    >
      <InputGroup>
        <Form.Control type="text" placeholder="Your zip code" name="ZIPCODE" />
        <InputGroup.Append>
          <Button type="submit" variant="outline-dark">
            Sign Up
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SimpleSubForm;