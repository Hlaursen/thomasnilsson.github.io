---
published: true
---
Recently I've been deploying some web projects written in PHP and Python on Linux servers.
And Ubuntu VM with LAMP was chosen since Ubuntu is very well documented on Stack Overflow, compared to the alternatives such as Amazon Linux, and sh\*t just works..!

Three of the projects I've deployed were for the medical sector, and when dealing with such entities security of data has to be prioritzed as number one. Therefore we went with Amazon Web Services, as Amazon has clear guidelines in regards to sharing data with 3rd parties, and where the data is stored. Connecting to an AWS EC2 instance is done with SSH key-pairs, instead of just using passwords, which is nice.

However for private projects I recommend Digital Ocean, since it's pretty much plug and play. From the time you've registered your account, it's probably less than 3 minutes before you have your instance up and running.

On Digital Ocean you pay a minimum of $5 per month though, but with Amazon you can get the lowest instance configuration free for a whole year, which may save you $60 the first year.