zip -r groupTalkRelase.zip ./ -x "./node_modules/*" ".git/*" "./log/*" "./deploy/*"

mkdir -p deploy

mv groupTalkRelase.zip ./deploy/groupTalkRelase.zip 
