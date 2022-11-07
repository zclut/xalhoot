
# Xalhoot

This is a small project and is a copy of the kahoot game using React and Apollo Server.


## Authors

- Juan Daniel Padilla - [@zclut](https://www.github.com/zclut)
- Jose Acosta - [@Acosta-JJ](https://github.com/Acosta-JJ)


## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the frontend directory.

`VITE_API_URI`

`VITE_WS_URI`


## Run Locally

Clone the project

```bash
  git clone https://github.com/zclut/xalhoot.git
```

Go to the project directory

```bash
  cd xalhoot
```

Install dependencies in the directory of backend and frontend

```bash
  cd client
  npm install

===============

  cd server
  npm install
```

Start the server

```bash
  npm run dev
```

## How to enter data for the questions?

Find the `data.js` file and create a json following this structure

```js
export const data = [
    {
        question: 'Example question?',
        answers: [
            { text: 'Example answer 1', correct: true },
            { text: 'Example answer 2', correct: false },
            { text: 'Example answer 3', correct: false },
            { text: 'Example answer 4', correct: false },
        ],
    },
    {
        ...
    }
]
```

## Screenshots

### Select user
![Select user](https://i.imgur.com/FqRKc7w.png)

### List of rooms
![List of rooms](https://i.imgur.com/aIl0vCR.png)

### Inside room
![Inside room](https://i.imgur.com/ERFIuqC.png)

### Question and answers
![Question and answers](https://i.imgur.com/t5KT7c4.png)

### Podium
![Podium](https://i.imgur.com/Zt4JBAu.png)
