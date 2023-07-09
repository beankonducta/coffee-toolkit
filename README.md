# COFFEE TOOLKIT

This is an (eventual) collection of web tools for people in the coffee world, both the professional and the hobbiest.

These tools help with quality and consistency from dialing in espresso, roasting coffee and diagnosing brews that aren't tasting great.

Built with Vue, Firebase and GPT-4

# SERVER

```
clone this repo
cd functions
npm i
```
Make sure you have firebase-tools installed as well
```
npm i -g firebase-tools
```
Then init the functions
```
firebase login
firebase init
```
You'll need an .env file in the functions directory with your [openai api key](https://platform.openai.com/account/api-keys)

Vue doesn't require nodeenv (as long as you're using Vue 3, which is what this project is), but you do have to preface your env variables with VUE_APP
```
VUE_APP_OPENAI_API_KEY="xxxxx"
```
To run locally:
```
firebase emulators:start --only functions
```

# ESPRESSO TOOL
Espresso tool helps dial in espresso, from initial suggestions when starting with a new coffee to helpful input as you dial in. GPT-4 makes suggestions based on user provided input.

```
clone this repo
cd espresso-tool
npm i
```
To run locally:
```
npm run serve
```