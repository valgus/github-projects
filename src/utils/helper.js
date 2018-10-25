import moment from "moment";

export function sortLicenses(a, b) {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
}

export function prepareQuery(licenses, subname) {
  let query = "sort:stars language:javascript created:>=";
  const datum = moment()
    .subtract(1, "months")
    .format("YYYY-MM-DD");
  query = query.concat(datum);
  if (licenses) {
    const checkedLicense = licenses.filter(license => license.checked)
      .map(license => "license:".concat(license.key));
    query = query.concat(" ").concat(checkedLicense.join(" "));
  }
  if (subname.length > 0) {
      query = query.concat(" ").concat(subname).concat(" in:name");
  }
  return query;
}

export function getFlatProject(projectTree) {
    return {
      name: projectTree.node.name,
      description: projectTree.node.description,
      createdAt: moment(projectTree.node.createdAt).format("YYYY-MM-DD"),
      license: projectTree.node.licenseInfo ? projectTree.node.licenseInfo.name : "",
      owner: projectTree.node.owner.login,
      stars: projectTree.node.stargazers.totalCount,
      url: projectTree.node.url
    };
}