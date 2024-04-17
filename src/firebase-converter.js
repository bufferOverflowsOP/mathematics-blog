class Message {
  constructor (username, pfp, text, id) {
    this.username = username;
    this.pfp = pfp;
    this.text = text;
    this.id = id;
  }
}

// Firestore data converter
const messageConverter = {
  toFirestore: (message) => {
    return {
      username: message.username,
      pfp: message.pfp,
      text: message.text,
      id: message.id
    };
  },
  fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Message(data.username, data.pfp, data.text, data.id);
  }
};

export { Message, messageConverter };