# need to check if ecr repo exists for this services docker images, if not create one so we can publish

REPO_EXISTS=$(aws ecr describe-repositories  | jq -r ".repositories[] | select(.repositoryName == \"${PROJECT}\") | .repositoryUri")

if [[ "" = "${REPO_EXISTS}" ]] ; then
  echo ${REPO_EXISTS} does not exist
  echo "Creating repo ${PROJECT}"
  REPO_EXISTS=$( aws ecr create-repository  --repository-name ${PROJECT} | jq -r .repository.repositoryUri)

  echo "Created repo ${REPO_EXISTS}"
  echo "Fetching default policy"
  POLICY_TEXT=$(aws ecr get-repository-policy  --repository-name example | jq ".policyText | fromjson" -rc)

  echo "fetched ${POLICY_TEXT}"
  echo "Updating policy on repo ${PROJECT}"
  aws ecr set-repository-policy  --repository-name ${PROJECT} --policy-text "${POLICY_TEXT}"
  
  echo "Applied ecr policy"
else
  echo ${REPO_EXISTS} exists
fi