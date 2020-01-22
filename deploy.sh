PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION

if [ -d "epitech/t-web-700/api" ]; then
  rm -R "epitech/t-web-700/api"
fi

if [ -d "epitech/t-web-700/api" ]; then
    echo "Le workspace epitech/t-web-700/api existe deja."
else
    mkdir -p "epitech/t-web-700/api"
fi

wget -P "epitech/download" "http://185.216.25.54:32778/repository/node-app/	t-dev-700-api/t-dev-700-api-$PACKAGE_VERSION.tgz"

tar -zxvf epitech/download/t-dev-700-api-$PACKAGE_VERSION.tgz -C epitech/t-web-700/api/

