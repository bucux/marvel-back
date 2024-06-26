
import mongoose from 'mongoose'

let mongooseInstance = null;

const mongoSingleton = () => {
  if (!mongooseInstance) {
    // let mongoURI = 'mongodb://127.0.0.1/vinteddb' // mongodb en local
    // if(process.env.HOSTNAME !== '17-pouces'){mongoURI = process.env.MONGO_ATLAS_URI}
    const mongoURI = process.env.MONGO_ATLAS_URI 
    mongoose.connect(mongoURI).then(() => {
      console.log('Connexion à MongoDB réussie.');
    }).catch((err) => {
      console.error('Erreur de connexion à MongoDB:', err);
    });
    mongooseInstance = mongoose;
  }
  return mongooseInstance;
};

export default mongoSingleton()