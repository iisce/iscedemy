"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Icons from "@/lib/icons";
import markdownToReact from "@/lib/markdown-util";
import { cn } from "@/lib/utils";
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from "react";
import { RiRobot3Fill } from "react-icons/ri";
import { BeatLoader } from "react-spinners";

export function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<{role:string; content: string}[]>([]);

  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageIndexPlayed, setLastMessageIndexPlayed] = useState<number | null>(null);

  const messageContainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage =  messages[messages.length - 1];

   if (isOpen && lastMessage?.role === "assistant" && lastMessageIndexPlayed !== messages.length - 1) {
    const audio = new Audio("/assets/bot_response.mp3");
    audio.play();
    setLastMessageIndexPlayed(messages.length - 1);
   }
  }, [messages, lastMessageIndexPlayed, isOpen]);

  useEffect(() => { 
    // Scroll to the bottom whenever messages update
    if (messageContainRef.current) {
      messageContainRef.current.scrollTop = messageContainRef.current.scrollHeight;
    }
  }, [messages]);
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(userInput);
    setUserInput("");
  };

  const sendMessage = async (messageContent: string) => {
    const userMessage = { role: "user", content: messageContent};
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageContent }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const botMessage = { role: "assistant", content: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setQuickReplies(data.quickReplies || []);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", 
        content: "Oops! Something went wrong. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
  }
};

const handleOpenChatbot = () => {
  if (messages.length === 0) {
    setMessages([
      { role: "assistant", content: "Hello there! 👋 I am PalmDesk Assistant. Welcome to PalmTechnIQ! 😊" }
    ]);
  }
  setIsOpen(true);
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
              <div key={index} className={cn("flex w-full gap-2", message.role === "user" && "justify-end" ? "flex-row-reverse " : "flex-row")}>
                <Avatar>
                  <AvatarImage alt="PalmTechnIQ" src={message.role === "assistant" ? "/avatars/01.png" : "/avatar/02.png"}/>
                  <AvatarFallback><RiRobot3Fill/></AvatarFallback>
                </Avatar>
                <div className={cn("flex w-fit xl:max-w-[75%] rounded-lg px-3 text-sm text-white", message.role === "user" && "bg-black rounded-br-none after:right-[-10px]", message.role === "assistant" && "bg-green-600 rounded-bl-none after:left-[-10px] px-4")}>
                  <div className="text-sm text-white">{markdownToReact({ markdown: message.content })}</div>
                </div>
              </div>
      ))}
        <div className="grid grid-cols-2 gap-3">
             {quickReplies.map((reply, i) => (
            <Button
              key={i}
              onClick={() => {
              sendMessage(reply);
              setQuickReplies([]);
            }}
              className="w-full gap-2 text-center text-wrap justify-start"
              variant="secondary"
              >
                {reply}
            </Button>
        ))}
  </div>
    </CardContent>
    <CardFooter>
      <form className="flex w-full items-center space-x-2" onSubmit={handleSubmit}>
        <Input autoComplete="off" type="text" className="flex-grow" id="message" placeholder="Type a message..." value={userInput}
          onChange={(e) => setUserInput(e.target.value)}/>
          <Button size="icon" type="submit" className=" rounded-lg justify-self-center px-2  items-center">
            {isLoading ? <BeatLoader size={8} className="px-2" color="#ffffff"/>: <Icons.SendIcon/>}
            <span className="sr-only ">Send</span>
          </Button>
      </form>
    </CardFooter>
  </Card>
  ) : (
    
    <Button
          onClick={handleOpenChatbot} 
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
