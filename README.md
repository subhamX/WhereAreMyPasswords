# 🤔 WhereAreMyPasswords?

## Inspiration
We all visit hundreds of websites in a day. The purpose varies from leisure activities like chatting with our friends, and watching some short videos, to serious activities like logging into the online bank website. But it leads you to memorize tonnes of passwords! And it's becoming increasingly challenging to manage them.

There are many password managers out there, but all require you to install many **OS-related dependencies**, or they are **cloud-based products**. And seriously, we shouldn't put critical credentials like bank passwords, Credit Card pins etc. in there. There are many instances where these online password managers got hacked!


## What it does
Introducing **🤔 WhereAreMyPasswords?**!
It's a 100% offline browser-based progressive web app to store your passwords and secure notes.

Although online password managers aren't very safe, an offline password manager can help keep our passwords safe, secure, and offer outstanding convenience. Now we don't need to worry about the security of password managers as it always stays on our machine. 

Modern password managers are overcomplicated. We aim to make a simple, secure, and user-friendly password manager that is accessible to everyone.

We've built this app on top of the most used loved application (i.e. browser 👻). It's offline, secure, blazing fast, and provides top-of-the-line security with local password and login saves.



## How we built it
Our aim is offline first, so we used the most loved frontend framework Nextjs to build a progressive web app. 

Our app uses state-of-the-art [AES encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) to store the passwords encrypted in the browser. It's near to impossible to crack the cypher with a strong key!

We tried to make the app as convenient as possible for the user. One of the ways we did this was by integrating an email client powered by Twilio. This way, the user can easily share credentials with anyone with just one click. Please note that encryption is done on the browser and then sent to our servers. It ensures that the credentials never get stolen! 

Sometimes you would want to take a manual backup of the vault. That's very easy, and with a few clicks, you can create one. You can also import a vault easily. While importing, we’re using an intelligent merge algorithm to remove duplicate entries, so you don't need to manually do it! Another way in which this app provides a sublime experience.

Please note that we currently only support encrypted backups for your safety!


## What's next for WhereAreMyPasswords
We plan to use WebRTC to perform peer-to-peer on-demand sync between vaults in different machines. Since the data remains in-network only for a small duration and is always in an encrypted format, the chances of any malicious actor gaining access to it are very low. It will very much improve the user experience.
