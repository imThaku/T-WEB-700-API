PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION

if [ -d "/home/epitech/t-web-700/api" ]; then
  rm -R "/home/epitech/t-web-700/api"
  echo "Le workspace epitech/t-web-700/api existe pas"
else
  echo "Le workspace epitech/t-web-700/api existe pas"
fi

if [ -d "/home/epitech/t-web-700/api" ]; then
    echo "Le workspace epitech/t-web-700/api existe deja."
else
    mkdir -p "/home/epitech/t-web-700/api"
    echo "sa passe ici"
fi

if [ -d "/home/epitech/download" ]; then
  rm -R "/home/epitech/download"
  echo "Le workspace epitech/download existe"
else
  echo "Le workspace epitech/download existe pas"
fi

if [ -d "/home/epitech/download" ]; then
    echo "Le workspace epitech/download existe deja."
else
    mkdir -p "/home/epitech/download"
    echo "sa passe ici"
fi

wget --user=admin --password=422960d4 -P "/home/epitech/download" "http://185.216.25.54:32778/repository/api-node/com/test.zip"

unzip /home/epitech/download/test.zip -d /home/epitech/t-web-700/api/

cd /home/epitech/t-web-700/api
rm package-lock.json
npm install



