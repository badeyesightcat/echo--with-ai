// import { mutation } from "./_generated/server";

// export const renameColumn = mutation({
//   handler: async (ctx) => {
//     const contactSessions = await ctx.db.query("contactSessions").collect();

//     for (const contactSession of contactSessions) {
//       if (
//         contactSession?.metadata?.cookieEnalbled &&
//         !contactSession?.metadata?.cookieEnabled
//       ) {
//         await ctx.db.patch(contactSession._id, {
//           metadata: {
//             cookieEnabled: contactSession.metadata.cookieEnalbled,
//             cookieEnalbled: undefined,
//           },
//         });
//       }
//     }
//   },
// });
