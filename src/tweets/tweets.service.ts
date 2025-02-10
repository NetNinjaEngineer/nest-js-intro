import { Tweet } from "./models/tweet.model";

export class TweetsService {
    private readonly tweets: Tweet[] = [
        {
            id: 1,
            text: "Just finished an amazing project with #TypeScript and #Angular! 🚀",
            createdAt: new Date("2024-02-01T12:00:00Z"),
            updatedAt: new Date("2024-02-01T12:30:00Z"),
            author: "devMohamed",
            likes: 120,
            retweets: 50,
            replies: 10,
            hashtags: ["TypeScript", "Angular"],
            mediaUrl: "https://example.com/image1.jpg",
            isPinned: false
        },
        {
            id: 2,
            text: "Learning RxJS has been a game changer for handling async data in Angular! 🔥",
            createdAt: new Date("2024-02-02T08:15:00Z"),
            updatedAt: new Date("2024-02-02T08:45:00Z"),
            author: "codeMaster",
            likes: 95,
            retweets: 30,
            replies: 5,
            hashtags: ["RxJS", "Angular"],
            mediaUrl: undefined,
            isPinned: false
        },
        {
            id: 3,
            text: "Deploying an app to #Azure is so smooth! Loving the cloud experience ☁️",
            createdAt: new Date("2024-02-03T14:45:00Z"),
            updatedAt: new Date("2024-02-03T15:00:00Z"),
            author: "cloudDev",
            likes: 140,
            retweets: 60,
            replies: 15,
            hashtags: ["Azure", "Cloud"],
            mediaUrl: "https://example.com/image2.jpg",
            isPinned: false
        },
        {
            id: 4,
            text: "GraphQL vs REST: Which one do you prefer and why? #API #GraphQL",
            createdAt: new Date("2024-02-04T18:30:00Z"),
            updatedAt: new Date("2024-02-04T19:00:00Z"),
            author: "apiGuru",
            likes: 200,
            retweets: 100,
            replies: 50,
            hashtags: ["API", "GraphQL", "REST"],
            mediaUrl: undefined,
            isPinned: false
        },
        {
            id: 5,
            text: "Exploring #MachineLearning with Python! 🚀 Any book recommendations?",
            createdAt: new Date("2024-02-05T10:00:00Z"),
            updatedAt: new Date("2024-02-05T10:30:00Z"),
            author: "aiExplorer",
            likes: 300,
            retweets: 150,
            replies: 80,
            hashtags: ["MachineLearning", "Python", "AI"],
            mediaUrl: "https://example.com/image3.jpg",
            isPinned: true
        },
        {
            id: 6,
            text: "What’s your favorite frontend framework? #React, #Vue, or #Angular?",
            createdAt: new Date("2024-02-06T07:45:00Z"),
            updatedAt: new Date("2024-02-06T08:15:00Z"),
            author: "frontendFanatic",
            likes: 180,
            retweets: 75,
            replies: 25,
            hashtags: ["React", "Vue", "Angular", "Frontend"],
            mediaUrl: undefined,
            isPinned: false
        },
        {
            id: 7,
            text: "Dockerizing my Node.js API today! Loving how easy it makes deployment! 🐳",
            createdAt: new Date("2024-02-07T09:30:00Z"),
            updatedAt: new Date("2024-02-07T10:00:00Z"),
            author: "devOpsNerd",
            likes: 220,
            retweets: 90,
            replies: 30,
            hashtags: ["Docker", "DevOps", "NodeJS"],
            mediaUrl: "https://example.com/image4.jpg",
            isPinned: false
        },
        {
            id: 8,
            text: "Dark mode or Light mode? What’s your preference? 🌙☀️ #UX #UI",
            createdAt: new Date("2024-02-08T20:00:00Z"),
            updatedAt: new Date("2024-02-08T20:15:00Z"),
            author: "uiDesigner",
            likes: 250,
            retweets: 120,
            replies: 70,
            hashtags: ["UX", "UI", "DarkMode", "LightMode"],
            mediaUrl: undefined,
            isPinned: false
        },
        {
            id: 9,
            text: "Using Redis caching has significantly boosted my API performance! #Redis #Performance",
            createdAt: new Date("2024-02-09T13:00:00Z"),
            updatedAt: new Date("2024-02-09T13:30:00Z"),
            author: "backendGuru",
            likes: 175,
            retweets: 80,
            replies: 20,
            hashtags: ["Redis", "Performance", "Caching"],
            mediaUrl: "https://example.com/image5.jpg",
            isPinned: false
        },
        {
            id: 10,
            text: "Today I learned about #CQRS and #EventSourcing! Mind-blowing concepts! 🔥",
            createdAt: new Date("2024-02-10T16:45:00Z"),
            updatedAt: new Date("2024-02-10T17:15:00Z"),
            author: "architectureGeek",
            likes: 320,
            retweets: 140,
            replies: 90,
            hashtags: ["CQRS", "EventSourcing", "Architecture"],
            mediaUrl: undefined,
            isPinned: true
        }
    ];


    getAllTweets(): Tweet[] {
        return this.tweets;
    }


    getTweetById(id: number): Tweet | undefined {
        return this.tweets.find(tweet => tweet.id === id);
    }

}