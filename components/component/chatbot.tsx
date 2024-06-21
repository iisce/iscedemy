"use client";
import React, { useState, useEffect, useRef } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { RiRobot3Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button"
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import * as Icons from "@/lib/icons"
import { cn } from "@/lib/utils";
import markdownToReact from "@/lib/markdown-util";
import { BeatLoader } from "react-spinners";

export function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello there! 👋 I am PalmDesk Assistant. Welcome to PalmTechnIQ!  What can I help you with today? 😊" },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageIndexPlayed, setLastMessageIndexPlayed] = useState<number | null>(null);

  const messageContainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage =  messages[messages.length - 1];

   if (lastMessage.role === "assistant" && lastMessageIndexPlayed !== messages.length - 1) {
    const audio = new Audio("/assets/bot_response.mp3");
    audio.play();
    setLastMessageIndexPlayed(messages.length - 1);
   }
  }, [messages, lastMessageIndexPlayed]);

  useEffect(() => { 
    // Scroll to the bottom whenever messages update
    if (messageContainRef.current) {
      messageContainRef.current.scrollTop = messageContainRef.current.scrollHeight;
    }
  }, [messages]);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userMessage = { role: "user", content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const botMessage = { role: "assistant", content: data.response, };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", 
        content: "Oops! Something went wrong. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");}
  };

  //Helper function to convert urls to links
  const formatMessage = (message: string) => {
    // Refined regular expression to match a wider range of URL patterns
    const urlRegex = /(https?:\/\/[^\s]+[^.,:])/g;
  
    return (
      <span>
        {message.split(urlRegex).map((part, i) =>
          part.match(urlRegex) ? (
            // Render links for detected URLs, replacing the last character ('') with an empty string
            <a key={i} href={part.slice(0,-1)} target="_blank" rel="noopener noreferrer" className="text-tertiary hover:underline">
              {part.slice(0,-1)} 
            </a>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
    <Card className="max-w-md w-full ">
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage alt="PalmTechnIQ" src="/avatars/01.png" />
          <AvatarFallback><RiRobot3Fill /></AvatarFallback>
        </Avatar>
        
        <div>
          <p className="text-sm font-medium leading-none">PalmDesk AI</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Here to help</p>
        </div>
      </div>
      <Button onClick={() => setIsOpen(false)}  className=" rounded-full justify-self-center px-2 items-center" size="icon" variant="outline">
        <div className=" " >
        <Icons.XIcon />
        <span className="sr-only">Close</span>
        </div>
      </Button>
    </CardHeader>
    <CardContent className="prose space-y-4  max-h-96 overflow-y-auto" ref={messageContainRef} >
    {messages.map((message, index) => (
              <div key={index} className={cn("flex w-full gap-2", message.role === "user" && "justify-end")}>
                <div className={cn("flex w-fit max-w-[75%] rounded-lg px-3 text-sm text-white", message.role === "user" && "bg-black rounded-br-none after:right-[-10px]", message.role === "assistant" && "bg-green-600 rounded-bl-none after:left-[-10px] px-4")}>
                  {message.role === "assistant" && isLoading && index === messages.length - 1 ? (
                    <BeatLoader className="text-green-600" />
                  ) : (
                    <div className="text-sm text-white">{markdownToReact({ markdown: message.content })}</div>
                  )}
                </div>
              </div>
            ))}
    </CardContent>
    <CardFooter>
      <form className="flex w-full items-center space-x-2" onSubmit={handleSubmit}>
        <Input autoComplete="off" className="flex-1" id="message" placeholder="Type your message..." value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
           />
        <Button size="icon" type="submit" className=" rounded-lg justify-self-center px-2 items-center">
          <div className="">
          <Icons.SendIcon  />
          <span className="sr-only ">Send</span>
          </div>
        </Button>
      </form>
    </CardFooter>
  </Card>
  ) : (
    <Button
          onClick={() => setIsOpen(true)} 
          className="rounded-full w-full px-3 py-8 bg-green-600 text-white"
          size="icon"
        >
          <ChatBubbleLeftRightIcon className="h-10 w-10 " />
          <span className="sr-only">Open Chat</span>
        </Button>
  )}
  </div>
  );
}
