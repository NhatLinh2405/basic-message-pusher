"use client";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";

interface IMessage {
	username: string;
	message: string;
}

export default function Home() {
	const [username, setUsername] = useState("username");
	const [messages, setMessages] = useState<IMessage[]>([]);

	const [message, setMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch("http://localhost:8000/message", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				message,
			}),
		});

		setMessage("");
	};

	useEffect(() => {
		const pusher = new Pusher("812425bbd6fed1d93e7f", {
			cluster: "ap1",
		});

		const channel = pusher.subscribe("chat");
		const messageHandler = (data: IMessage) => {
			setMessages((prevMessages: IMessage[]) => [...prevMessages, data]);
		};
		channel.bind("message", messageHandler);

		return () => {
			channel.unbind("message", messageHandler);
			pusher.unsubscribe("chat");
			pusher.disconnect();
		};
	}, []);

	useEffect(() => {
		setMessages([]);
	}, [username]);

	return (
		<div className="flex items-center justify-center h-screen">
			<form onSubmit={handleSubmit} action="">
				<input
					type="text"
					value={username}
					className="px-3 py-2 border border-black rounded-3xl"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					value={message}
					className="px-3 py-2 border border-black rounded-3xl"
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type="submit" className="px-4 py-3 text-white bg-sky-500 rounded-3xl">
					Submit
				</button>
			</form>

			<div className="">
				{messages.map((message: IMessage, index) => (
					<div key={index} className="px-3 py-2 border border-black rounded-3xl">
						{message.username}: {message.message}
					</div>
				))}
			</div>
		</div>
	);
}
