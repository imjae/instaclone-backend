import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + filename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/statics/${newFilename}`;
        }

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        const editUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        if (editUser) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Failed editProfile",
          };
        }
      }
    ),
  },
};
