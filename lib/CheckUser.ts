import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const checkUser = async () => {
  const user = await currentUser();
  console.log(user);

  // check the current logged in clerk user
  if (!user) {
    return null;
  }
  // check if user exists in db
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });
  // if the user in the db return user
  if (loggedInUser) {
    return loggedInUser;
  }
  // if not in db , create new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: "${user.firstName} ${user.lastName}",
      imageUrl: user.imageUrl,
      emial: user.emailAddresses[0].emailAddress,
    },
  });
  return newUser;
};
