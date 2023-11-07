const mongoose=require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    dataofBirth:{
        type:Date
    },
    image:{
        type:String
    }
})


const User=mongoose.model('User',userSchema)

async function findTodayBirthdays() {
    const today = new Date();
    const todayString = (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
    try {
        const todayBirthdays = await User.aggregate([
        {
          $addFields: {
            dateOfBirth: { $toDate: '$dateOfBirth' }
          }
        },
        {
          $addFields: {
            dobMonthDay: { $dateToString: { format: '%m-%d', date: '$dateOfBirth' } }
          }
        },
        {
          $match: {
            $expr: {
              $eq: ['$dobMonthDay', todayString]
            }
          }
        }
      ]);
      return todayBirthdays
    } catch (error) {
      console.error('Error:', error);
    }
}


findTodayBirthdays()


module.exports={
  User,
  findTodayBirthdays
}