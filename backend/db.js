import { Sequelize } from "sequelize";
import UserModel from "./models/users.js";
import EventModel from "./models/events.js";

const isProduction = process.env.NODE_ENV === "production";

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "./db.db",
      logging: false,
    });

const User = UserModel(sequelize);
const Event = EventModel(sequelize);

User.hasMany(Event, { foreignKey: "organizerId" });
Event.belongsTo(User, { foreignKey: "organizerId" });

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database is ready");
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", error);
  }
})();

export { sequelize, User, Event };
