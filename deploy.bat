call npm run build
echo pushing

rd /s /q ./dist
mkdir ./dist

cd ./dist
git add -A
git commit -m 'deploy'
git push -f git push -f git@github.com:belov38/skillbox-vue-deploy.git master:gh-pages
pause