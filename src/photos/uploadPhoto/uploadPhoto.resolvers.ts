import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          // caption 파싱하기
          const hashtags = caption.match(/#[\w]+/g);
          hashtagObj = hashtags.map((hashtag: String) => ({
            where: { hashtag },
            create: { hashtag },
          }));

          console.log(hashtagObj);

          return client.photo.create({
            data: {
              file,
              caption,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(hashtagObj.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtagObj,
                },
              }),
            },
          });
          // 파싱한 caption의 hashtag가 존재한다면, 기존 hashrag 가져오고,
          // 아니면 새로 생성한다.
        }
        // 파싱된 hashtag과 함께 사진 저장한다.

        // 해당 사진을 hashtags에 추가한다
      }
    ),
  },
};

export default resolvers;
