sed '/build/d' .gitignore > .gitignore.new && mv .gitignore.new .gitignore
git push heroku master