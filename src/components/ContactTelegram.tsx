"use client";
import { NextPage } from "next";
import { ReactNode } from "react";
import scss from "./ContactTelegram.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

//loval

interface iContactTelegram {
  subject: string;
  description: string;
  email: string;
  username: string;
}
const ContactTelegram: NextPage = (): ReactNode => {
  const token = process.env.NEXT_PUBLIC_TG_BOT_TOKEN;
  const idChennel = process.env.NEXT_PUBLIC_TG_CHANNEL_ID;

  const { handleSubmit, register } = useForm<iContactTelegram>();

  const messageModel = (data: iContactTelegram) => {
    let messageTG = `Username: <b> ${data.username}  </b>`;
    messageTG += `\nDescription: <b> ${data.description}  </b>`;
    messageTG += `\nEmail: <b> ${data.email}  </b>`;
    messageTG += `\nSubject: <b> ${data.subject}  </b>`;

    return messageTG;
  };

  const postMessage = async (message: string) => {
    const response = await axios.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: idChennel,
        parse_mode: "html",
        text: message,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Github 🔗",
                url: "https://github.com/Cucumberchik",
              },
              {
                text: "Youtube 💠",
                url: "https://www.youtube.com/@falcon_d3v",
              },
              {
                text: "Youtube",
                url: "https://www.youtube.com/@falcon_d3v",
              },
            ],
            [
              {
                text: "Youtube",
                url: "https://www.youtube.com/@falcon_d3v",
              },
            ],
          ],
        },
      }
    );
    console.log(response);
  };
  const onSubmit: SubmitHandler<iContactTelegram> = (fData) => {
    const message = messageModel(fData);
    postMessage(message);
  };

  return (
    <main className={scss.contact}>
      <div className="container">
        <div className={scss.content}>
          <button>heelo</button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="username"
              {...register("username", { required: true })}
            />
            <input
              type="text"
              placeholder="description"
              {...register("description", { required: true })}
            />
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              placeholder="subject"
              {...register("subject", { required: true })}
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ContactTelegram;
