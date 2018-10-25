import React from "react";
import Projects from "../components/Projects";
import * as data from "./test-data";
import renderer from "react-test-renderer";

describe("Projects component", () => {
  const projects = data.flatProjects;
  const licenses = data.licenses;
  const subname = "mock_subname";
  const page = 10;
  const onLicenseChange = jest.fn();
  const onSubnameChange = jest.fn();
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Projects
          projects={projects}
          licenses={licenses}
          subname={subname}
          page={page}
          onSubnameChange={onSubnameChange}
          onLicenseChange={onLicenseChange}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
