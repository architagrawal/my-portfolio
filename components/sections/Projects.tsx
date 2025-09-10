"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";

const projects = [
  {
    title: "Image Recognition as a Service",
    description:
      "Elastic cloud infrastructure SaaS for image recognition using deep learning models.",
    image:
      "https://nordicapis.com/wp-content/uploads/7-Best-Image-Recognition-APIs-e1587080882739.jpg",
    date: "Jan 2024 – Feb 2024",
    achievements: [
      "Developed an elastic cloud infrastructure SaaS using AWS EC2, AWS SQS, and Lambda.",
      "Enabled automatic linear scaling based on demand, serving 100 concurrent requests in 5 seconds.",
    ],
    technologies: ["AWS EC2", "AWS SQS", "AWS Lambda", "Python"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Soccer Game Result Prediction",
    description:
      "Enhanced soccer game result prediction accuracy using advanced ML techniques.",
    image:
      "https://localsportsjournal.com/wp-content/uploads/2022/05/soccer-logo-general-scaled.jpg",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Increased prediction accuracy by 12% using LSTM, RNN, and Random Forest with XGBoost.",
      "Incorporated sentiment analysis and game bet data for improved predictions.",
    ],
    technologies: ["Python", "Deep Learning", "Data Science", "Statistics"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "FitLife Health Tracking App",
    description:
      "Android app for tracking heart/breath rates and personalized workout routines.",
    image:
      "https://thumbs.dreamstime.com/b/illustration-depicting-various-health-fitness-technology-interactions-features-illustration-depicting-various-health-395487611.jpg",
    date: "Oct 2023 – Dec 2023",
    achievements: [
      "Programmed an Android app measuring heart and breath rates.",
      "Suggested personalized workout routines using machine learning and Fuzzy Logic Control.",
    ],
    technologies: ["Android Studio", "Matlab", "Machine Learning"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Reverse-Mode Automatic Differentiation",
    description:
      "Implemented reverse-mode auto-differentiation for training neural networks.",
    image: "https://i.ytimg.com/vi/1dqoFhl3zQQ/sddefault.jpg",
    date: "Feb 2024 – Mar 2024",
    achievements: [
      "Developed operators like Add and Matrix Multiplication for gradient node construction.",
      "Added CUDA GPU kernels for training simple neural networks like MLP models.",
    ],
    technologies: ["Python", "CUDA", "Neural Networks"],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "E-Commerce Platform",
    description: "",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEBIWFRUXFxYVFRUXFxcVFhgVFRYXFxYVFhcYHSggGB0lGxcWIjEhJSktLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGy0lHSUtKy0tLSstLy0tLS0tLS0tLS0rLS0tLS0vLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLf/AABEIAJ8BPgMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgQBAwUGB//EAEgQAAEDAgQCBgYIAwQJBQAAAAEAAgMEEQUSITFBUQYTImFxkRQyU4Gx0hVCUqGiwdHwI7PhJHODkhYlNVSCsrTT8QczNGJy/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EADoRAAIBAgQBCQYFAwUBAAAAAAABAgMRBBIhMUETUVJhcYGh0fAFFCIykbEjJDTh8XKywRVCU4KDov/aAAwDAQACEQMRAD8A+4oAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAICD5AFKVyLmh054K6giLkfSHKciF2bY6kHfT4KrhzE3N6oSEAQBAEAQBAEBB8gClK5FzS6c8FdQRFyPpBU5ELk2VXMe9Q4cwubwb7LMsZQBAEAQBAEAQBAQfIApUWyLmp1RyCuoEXIGd3NTlQuY9IdzTKhcm2q5hRkFzdHKDsVRxaJuTUEhAEAQGisq2RNL5XBrRxPwA3J7gr06cqkssFdkNpblbDsagnJET7ka5SC025gEa+5a1sLVoq81oQpJ7FLpJ0hFOMjAHSEXsdmjm7n4fs74PBOv8UtI/cpUqZdOJ4Wtxaok7T5X2O2pa2/IAWC92nhqMNIxX+TllOT3ZvwasrTmdTyOcWAExl2Ylp3ysdv3211CzxFPDaKqkr8bW8fMmEp/wC09Z0fx1tU03GWRvrt+7M3u+HkT5OLwjoPni9mb06in2nSfK0GxOvJchEq0IvK3qCpNSJUogs0k31T7v0Wc48SyZbWRYIAgCAIAgISvspSuQyqStSpEqQRKkESUIJwTZT3fvVRKNyUzoLAuEAQBAEAQAoCvJLyWijzlWzSrEGFIMFAYQGFIMXQgsQVPB3n+qpKHMWTLayLBAEB5L/1AgeWRvAJY0uzdxdlyk+RF+/vXreyZxUpRe7tYyqo8/0The6qjLL9k5nHgG2IN/Hb3r0cfOMaElLjsZwWpoeyWrmkdG0uJJcSSAGt4ZidAABb3K6dPDU4qTtw7WZazbsd2hoamKkmaCxxcQYmXbI1zW3MmUai5F9N7tK4KtahUxEW7q2727L+uJpGMlBnK6GYZM6eOcRnq257OJABORwAbc3Op3Gm66vaNemqUqTfxO2nejOjCTkpcCrBik7a2IzsDJAWxS2bkc8PNi59tHGxBuNNAtZYelLDSVN3jq1re1uYqpyU1m3PcSUzusLhqDr4L56+hjVwtR1XKOzJVdayIDMdTsBuVenSlPY9KEGopFWPFmn6pHktXh2uJfIy7HKDZzSsJRtoymx2AVymhlAEAQBAEBVldqtYrQqzWVYgiUBEqQRKlEESpBfo33b4aLCasy62N6oSEAQBAEBXmffTgtIoq2alYgwgMKQYKAipBgoDBQgwrAs0k31T7v0WU48UWTNeKGS7cl8ut8u99LXtw3UQtxOPGcreOS9uNiGJYqII2lwu92zfDcnuC0oYd1ZO2x2UlJxWbc5DsXqAe2Mt9cpZa4PjqutYelb4de80sjs4VVh12FgY4akAWB56cCuSvTa+K90Rax4g0Mno89NECZI58z2D1nwhtmkDdwzWNu8L3FVhy0K0/lcdHwTvr2aaHDleVxW9/A6bMZ6qnMktK6IMETImGV7S9zHX7LS0ZbXJLrdoaG65XhuUrZYVFK923ZO1+d316lw30NOUtG7VubU0Y9iRNpYaR8glgMccrHvc1gkFnN6prSA4H3m3lfC0EvgqVEssrtNLW2zve9itSfFR3W/7HOmpXvnoIZNZ2NzTcS2Nr88bXnmGAjX7Q5rojUjGlXqR+Ru0e21m13lHFuUE9+J7srwjrPLUz2SunllDiGWIANtC7KB5WXpzUqahCHHyNrW0OjEImRiUwuLXXaLvB562tpsdVzy5SUnDNquog3hoZK6Nt7aWvr9UH8yqNudNSe5WWx6Jg0C4GDKgBAEAQBAU3rZFCBUgiVIIFCDBVgQJQFzDtj7llU4FolxZFggCAICEzrBWitSGVloVIlAYUgwUBgoDCkGChBhSCtW1QjbfidAFeMXJmtGlykrcDn07p5iclzbkco8PFWkow3PQtQprVL7lqjxh7HZJtQDY33afEbqkqCkrxK1KMJq8NzmdL3n0hvLI3Lb/APTtveu7AJci+1nHEvRvcHNz5evIc4NA7MYIL3PcBe7zqbLBpNPLfJ9+Fl1EGcPDhUBrjd19TzuLk69yVcrpXWxL2NnSjo66ciandknaLXBLcw5ZhqHcj7jwtGCxqpLk6ivB+BzVaWbWO585xenqmu/tLZcw0zSZneTzcEeBX0VCdBr8Jq3VZeBxTU/91yWDx1xu2l65oO5aXMZ4l2jQe/dRiJYVa1st+uzfmIKptG57bo/hDaQOdI7rJ3+u7U2G+UE676knUrwsZi3XajFWgtl69I0z06HzO8jtslB2XEaQxEJ6HmZj6LJK18XWRy2t2izQOzWuAdQeC9SP48YuMrSj1XO1O6JR4jAQB6ObDYdc8gX3sLKHRqp3z/8AyibHWopOse+oc3K0C9r39UAaHjt965KqyRVJO7ISzNRRKJs07rkua0gkHZvdbnrZYtQprrO6U6dJWitRh1dLFI2OcOyvNm5uB4WPEbD3hXnRhODlDgY1skleJ6JcRyhAEAQFScWK1jsVZpJViCJUgwpIIEqQRKEHRomWb46rCo7s0jsWFQkIAgCArzHVaR2Ks1KxBhAYKkGCgIqQYQGChBhWBwOkkhD2csp876/ku3CxumdVCVkzOBzlzHMdE58fbOZl8zXdU4EAcSW6C/EhRiKaUk1JJ6b9pactbplLE4+qldHmJAsbnfUA69+q1o/iQUrF41bo9FUYQKmmiucsjWNLXeIGh7tvBcUMRyFaXFX1OeT+JnFbgVUHerc3vnD2787k3XY8XQcd+6wujv4dQCnaZZnXdbhra/AcyV5uKxKktNEiYxc5KMTVJjLyeyA0eZ968t4hvY744KCXxalmlxU3s8DxH5haQrc5lVwqSvE6FTJlY529mk+QuumOrPNqzyQlLmTOFT0l7Xf23jOG23Gu55mxW7l9DxqdDNa8vikr2/ctx01tCbOtfLbh4qrkdEaFtG/ite37kJ2tLSHgFvG+oWkG07rc7aDcoq25yWtpwbti9+tvcCV0OrVas2eksJUa1kegjDJYXNjO4I13BtpcLjvKE05GLhKlLU89QYwaUPZIxxfm9S9gBxN+/u3svRnheXtKLVrbk1HmdzNI01VWJW5uraWuu76uUAhnL1uXilS2Hw+R/M7/AM/QreysetMrQbFwvyuLrx8yIyyavYmpKhAEBrmjuO9Wi7ENFJy2RUgVJBgqQQKEG2mgzHXb96KspWRZI6a5y4QBAEAQFR51K1WxQiVIIqQYKAwUBhSDBQgwpBgoCji1AJmWvZw1ae/ke4rfD1uSlfgSnY87EyrgJDBIL3vlBc06WvpcX+9elJ4esryt36M0umWMKwaSWQOnuGk3dmPad3cx4lZ18VCnC1PfwQzHtJq2OPRzgO4a29w2XhqMpamkKM56pGaetjfo1wJ5bHyKOLW4nRnD5kczpPIQGDgS4nxFrfErjxT0SOz2fFNyfYV8Mw5zu08FrBrroT+g71nSpN6vY2xGJUdI6stVcsZjb1bbDMRtbYH+i0m4uKymFKM1Ued8C9RjPEA7YgtPhqPgt6T+FM48TBOUovZ/5ONI6WL+G46agG24PI/kutZZanzs5V6H4benB9Xab6WZ5GRuvDbhyvyUSS3NKNSpJZIjpIOrgFvtAOPuJ+IC1wiz1O49vCxVOyN1FSU0jGyNAsBrrxtqH94VKkqsJOL9dhq61RXVylg1Qw1Ugh/9vKfDTLqO65NvFb16clRTnuTUm3BX3NsvSCikfkeWuF7B7mXZfucRb37KI4PFQjmWnVfX6HJy0b7lrGqnqmNZH2c19tLAb2ttuF5OIqtdrPQwdFVJNy2Rx42m+WxvytrfwXKk72PRk1a99Dt4bI5rjG7lca3t3LqpNp5WebiIxks8TpLc5AgCAhJEHb+alSaIsVnUh4EH7loqiIykPRHd3mrcoiMrNkdEPrG/cqOpzEqJaAtssyxlAEAQBAEBTfuVstijIlAYUgwUBFSDCAwUIMKwISyBoJOwVJzUIuTL04OclGO7KYklcMzWnKdrC/3rgeIqy1Wx6Sw9CHwyd31s2RyuGjgfeLLSniJJ2mZVcLFq9MjXVRjbmG97D9fK69GnDO7HJQgpT12NTsOAYJHzW0DnWYXEZhfWxv70U25ZVHxO73l3sl4mH4eBGZWy3sMwGQsJAtqLm/EaqVO8srXjce8NvK14l9l6mBrgbSNOh27Tf1FiuHF0LOy7UZ06io1Hf5X9jlzVU2rJHOHMHT/yF50pz2kz0oUqXzQSN1HG+SzW7DyF91aClLRGdWUKd5Pc9JDGGtDRwFl3JWVjyJScm2yRF91JRpPcq4m57IZHQNu8McWNA3cBppx8FrRUZVIqb0urlWssXlR5nonUz1TZY6oOdHYdpzcpDr7DQbb91hzXp4+FLDyjKjZPqd9PX1M6E5u9za/otK3M2OYZHesDmFwNrgaFVXtCm7OUdUdNzpU+ACOnljY7+JIxzTIdLEtIFhwAJuuaeMc6sZyWiadik7yTR4iKOfqvRPQiJes3yyZfUDesz58ua/H1e5e1KVLlOX5X4bc6572ta9vE4Vmtly6ntcSw1/URAdp0TQ02+t2QCR7xdfJ41cpJziuL8T28BVVN5ZcfuUo8Sfa2l9s9u3bldcirSt/nid0sNC9+HNwOjg0Wud2gtYX434rooQfzHHi6i+RHW6wcwumzOEkoAQBAEAQBAEAQBAEAQBAVZhqtY7FWa1YgiUBhAYUgwUIMKQYKkFHF75Bb7Qv5H87Ljxt+T7zv9nW5XXm8hTtkfFH1d7tLwbG3IrkjmcFl6zrqOEKss/GxYnkcYmEkjWxDtyR9YE8FeTbgrmUIpVZJeHAoYxTudCXN+pZx8LWPxv7ivawcknFS4q3ecMZWqO3WVxiMOZkjZ3scGNYR1ZcDlGoOtiF0e71LOLimrt7ls2liEuIRWlcZnyPewsALC0C5B56BTGhUvFZUknfcZtjo0Va2joxLMD2nXa3iS4dka7aNv4XXPOi8TiMkOHH7+RlWqpasnh3SHrJBFPTmIlxa0ntNLm6ltyBrttzCrXwKjDPCSkt+7nM4Vne2x6ADkuA0MoAgCA5VbXOLzFFYEC73nZo468F1U6UVHPPuRKRSbML2bVHN3hwaTyuStnF21hp3XJOlhtc5zjHILPb94/dvNc9WkklOOzIaFfiOQ5W6u48h/VZxhfU4MTi+TeSO5ohr38SD7h+Ss4I54YupfVm8hrjctbfwF/NU5OO9j06eIlOOjfZcqUVcZHPaWFuU2ub67/oumpSyJO+5ecYpKzLRWRQNeRsUaTBZhqb6HQrOULbFkywqEhAEAQBAEAQBAEAQGmobpdXgyGVloVMFARKkGEBhCDCsDCgEJWBwIOxUSipLK9i0JuElKO6KHo0rRlY7s3zW2N+Z8h5Lz5YWpHSL0PUjjKM/imrStbnLAY9xzSG5W1PDSbzVGc9TEwjHLSXedeiis254/Dgtqkrs5Io5Fd0Uiec0bjHfhbM33DS3muyl7RnFWkr/AHLXM4f0WiYQ57jIRsCLN944+air7QnNWirfcXNvSvBjVQhrCA9jxI0OvlcQCC11tbEEqmBxKw9TM9mrO2/ajGrTzx0OPhWC1ck8UtY1jBDfKGkXcAbsaGtOVrW897AA33HZXxWHhSlCi283Pw53rrd/QzhTm5Jy4Hsl450hAEAQHj3POWqA9YPBdzyB7rnwvqvWSWam+FvGxfmNH0pGBdsDQ86EklzR3tYeK093ns5aeP1Fjp0xPpMDT6wiHWcwcrtHd+rfuXNNLkZvhfT6ojgbqIMM8nW75jlB2Op/K1lyyvlVjxKCg8RPlN7u1+31Y5+Dz1jqktnDur7WcObaNoscuQ2tvbbcXWlRU1C8dzLDTxUsQ41V8Ot7rRc1n60O3GRc5TpwWS6z0KFs8suwknaNC5oPIkAq6i3sjquirJisAOUzMuNxmC1WHqtXUWZyrU47yROnq45L9W9rrb2N7Kk6c4fMrCFaFT5GmbVU0LtJNfQ7j4LKcbalkywsywQBAEAQBAEAQBACEBSlZYrZO5RmsqQYUgwUIMKUDBQHn8exWZsrYKcdogG9gTrfQX0GgJJK9DC4enKDqVNjlr1ZqSjDcgGYh7SPyb8itfCdF+PmZfmedeu4z1df7SPyb8ij8p0X4+ZDWK6S8PIz1df7Rnk35EvheZ+PmVtjOkvDyN3XYj7Vnk35FTJhOi/HzI/PdJeHkZ67Efas8m/IoyYTovx8x+e6S8PIddiPtWeTfkU5MJ0X4+Y/PdJeHkOuxH2rPJvyJkwnRfj5j890l4eQ67Efas8m/IoyYTovx8x+e6S8PI14fj9SydsVRZwc5rSLNBGY2DgW7jUK1XB0ZUnOnw1M6WNrwrKnV4u317D2a8c9sIAgOJi+ESGTr6Z2WT6wOzh+ttNdDpsu2hiIqPJ1VeP2JTOWyGqzdmjiY/7dm2B5gZrA+a6XKhbWo2ub0idDtYJhJhzPkdnlf6zuA42F99ePguPEYhVLRirRRDZHFsPzuzM0dxB2P9VnTlZWPNxeC5SWeG/HrKsdLJsdu83CvdHLDC13o/uXo2Bo37yVU9OlSVONjzeF4fHVGWomaSHvIYLkWa3TgfAf8K9KtWnQUacHstTCnTjVbnLi9DZL0Ppy4kOkbfg1wt+JpP3pH2nWSs0n3eTN3Sja1i7hWDR05JYXuJFruINhvYWAWFfFTrJZkl2FadCFNuUVqdErmNgx9iCjV1YXOquY0CAIAgCAIAgCAIAgIvYCLFSnYFKWMj9VrF3KNEFYEShBhWAUA85Of9Yt/uvmXpQ/Rvt8jnkvxL9R2HvIK5EizZHrCpsiLmXPN1CQbAeVNhcOeUSFw15uoaCZgyFTYXJMfcqGiUzhYp/8yHxi/mFdtH9PPv8AseViv1cP+v3Perwj3wgPP9NXvbAHxvezK8ZixxacpBHA87Lv9nqMqrjJJ3XE5cW2oXTtqc/GMJmhgdKysndlsbZ3AEEgE+tyN1vh8RTqVFB04q/UjOrSlCDkpv6lqlwGR7GPFbUWc1rvXd9YA/aWc8XCMnHko6dRaNBtJ539SjgGHTVEZe6rnaQ8ssHuOwB+13rbE1qdGaiqcXpfZFKNOVSN3J/U1x0ErqmWD0ua0bWnNndckhpt63f9ys6sFRjU5OOvUQqcnUcMz06yNbQysmhhbVTHrM1zndoG63Gvj5KadWEqcpuEdOoidOSnGKk9esY5h74Yi70qZxJDQ0udZ2bcHXldMNWjUnbIlxvYVqbhG+ZnoMPpuqiZH9loB8d3HzuuCrPPNy5zrpxyxSN5WZYipBgqQRKEHUgPZb4Bc0t2aLY2KCQgCAIAgCAIAgCAIDBCAryUv2Vop85WxXfC4cPzV1JEWNZCsQLckB5upBGJNB0/g/MvTp/on/V5GUl8Vzry7rkWxV7kQpIMybqFsSzDdwpexBl25RbBhm6h7EowVJBKPdQ9iUcXEx/bIfGH+YV2Uf08+/7HmYlfmof9f7j3i8I94IDmdJIM9LM3/wChd72dofBdGEnlrRfX99DKvG9No8/F6dNS6GExGMjjns0WPC2bRd8vdqdfW+a/d/Byrlp0+FrGzA5K98EZhMOQDK3NmzWaS3Ww7lGJjhY1Wp5r9XWTRdZwWW1iv0dbWBsjYDEAJXZ89/XsAbW4aBXxbw94upfZWtzFaHK2ajbc10YqzUTlhi6wZRITfLtYZf8AKrVOQVGCd8utufvIhyvKSta/EjarfVbxdbGzvyAO/PtqfwI0OOVvv9aD8V1eF0u42SCeSpihqCw5f4pDL2sL2vfvAH/EqrkoUZTp3101JeeVSMZ2010PTleadpEqUQYKAiVIIlCDrRNs0DuC5m7s1RNQAgCAIAgCAIDXLJZWirkNlZ0zua0yorc209RfQ7qkoW1RZMsKhIQBAEAQHjMU/wBqN/uPnXtUP0D/AKvIxnudN4PD4j9CuVWM3cy1p4k/d+iNixhzTfT4j5UTXr+Q0zLW95+79FDYsRc137I+VTdev5FmTa3vP3fkFFxYhld+yPlVrr1/JFmTa23Eny/IKty1ilKe3J40X/UlapfDH/0/tOOqvjl/5/3nq15Z6oQEXsBBB2IsfAqU7O4ep4zAMXkhiMAp5Jcj3tJYCQNdQbA8br18Th4VZ8pnSuluefRquEcuVu3MR6OYxJDG6IU0smV7vVBOXbsu00N7q2Lw0ak1NzSuuPHrFCs4Ry5WxgWMPjdPlppX5pXOIaCSwknsusND+iYnDRmoXmlZJa8ewijWcXK0W9TXhmKPbLUPFNK8vfqGgnJlLuy7TQ6qa1CLhCLmlZfXsFOq1KTyt3IYdibxNPKKeR+cgWaCcuX6psN9vJTVoRdOEHNK3PxIp1XnlLK3cvdHX9bJNUkWzEMaOQABI/5VjilycIUlw19eJrQeeUp9x3SuE6SKsDBQEShBspo8zhy3KibsiUjqLmNAgNT5wO9WUWyLmGVAOmyODQublUkIAgCAq1B1WsdirKziroqYiPab4hJbMLc6i5zQIAgCAIDxmKf7Ub/cfOvaofoH/V5GM9zrLjKGUB5LEeljg8thDcrSRmcCSbcRroF61H2cnFOb1Zi6uuhufilaASWR2AJNi11gGh/aAecpykGx1sVVYfDN2Tfjz25ucteZk4rVgXLGWsXE6WADGv17WnZew2O+aw1Ue74e9rv02ubnTF5G/B8fMjxHIACfVI015EKmIwahHNEmM7neXnlwgPNY0f7ZD/hfzCvSw/6eXf8AY8+vG9eL7Pue1p57Gx2+C8WUb6nrJl1YlwgPJ0mIRUtXVNmdla9zXt0c7UguPqg/a+5epOjOvQpuCu1devocUakaVSalxNOD43TxVFS4yWjkc17DlfqdS7S1xqePJXr4WrOlTSWq0eq7itKtCM5a6MxgmOU8c1S58lmyPDmHK831cToBcbjdMRhas6dNJapWeq6hSrQjOTb0bHR7HKeITmR9i+V72jK43adthpx3TFYWrNwUVskuAoV4RzXe7ZSwrFo4qV4z/wAZ2d1rO9Z1mg3tbgDutq2HnUrJ2+FWKU6sY03rqd7Aqbq6eNvG2Y+LtfuuB7lw4meerJnVRjlgkXisUaGCpBEoDDWkmwUXsDp08OUW48VhKWZl0rG1VJNcxsFaK1IZTcVqVNTirIg6FM+7QT+7LCSsy62NqqSEAQGqaLN4q0ZWIaKjoHclqpIrZm+mpspud/gqTnfREpWLKzLBAEAQBAeLxU/61Z/c/OvaofoH/V5GM9zrrjKGUB86xbo5URyO6tjpGEktLddDwI3BC+hoY2lOCzOz43OWVOSeh0pq6scAHUby2xa4HObtMYjIafqCwB04hc0aWHjdqor7rbnvrz+Ro5zf+0rzGscJW+jPaJOquAHWAhFmAX30DdTyWsfd4uLzq8b83Hcq3N303/wWujmCzda2SVpY1pvroSeAA4a8SssXiqeRxg7tkwg73Z7BeObhAeXxw/22H/C/mFephl+Wn3/Y5Kq/Fj3fc9c4rxz0DqROu0HuC5nuaImoBTq8Kgldmkia51rXI1sFtCvUgrRk0jOVKEndo0/QFL7Bnkre91ukyOQp9FD6ApfYM8k97rdJjkKfRQ+gKX2DPJPe63SY5Cn0Uc/HsDpWwSOEbWFrSWuGnaA7I77mwt3row2KrOrFXvdmVajTUG7WHRRjn0rCTsXNF+LQdPLb3KMa1Gs0icNd01c6ToHclzqaNrMj1DuRU5kLM2Moydzb7yquouAyluKIN2Cycm9yyViagkICErbiylOzIZQet0VNdiTYKb2IOnCzKAFzt3dzRE1ACAIAgCAIAgCAIAgCA8t0q6Nyzysnp3hsjQGkEluxJDmkA66kW/Z9XA46nSpulVV0yko3KQwrFfaxfh/7a294wHRfrvKZGPovFfaxfh+RPeMB0X67xkY+i8V9rF+H5E94wHRfrvGRj6LxX2sX4fkT3jAdF+u8ZGPovFfaxfh+RPeMB0X67xkY+i8V9rF+H5E94wHRfrvGRms0WKDeSL8PyK3K4Hov13lXCQ9ExP2kX4fkTlcF0X67yrhM00PR2czCWoe02cHGxJLi3UDYADQK1XG0uScKS6iiovNdnqLXNgvKOk6zG2AHIWXM3dmhJQDzPSWgbJIHekPYQ0DI0Fw3Jv6wtv8ABelg6rhC2RPr9JnFiYpu+Zop03RcyC7ax3eMpuPxrWeOUHZ019f2KQoZ1dT9fU2/6HP/AN7d/lPzqn+pR/419f2L+6S6Xr6j/Q9/+9u/yn51P+ox/wCNfX9h7o+l6+pSGBRZgJKmR7QeDbeRLj8Ft71O14wSfb+yMXTgnaUmz2lJExrGtjADAAG22svHnKUpNy3PRgkorLsblQsEAQBAEAQBARcwHcXUptANYBsLI22CSgBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQGmeG+o3V4ysQ0U3sI3C1TTKsgGE7AlTdIguU1Nl1O/wWUp30RZIsrMsEBwaWZjJpeu3Ju0kXFiSfhZd84ynTjyZnlV7s24S4Ome5gsyx8NSLfmqV01TSluZUoWqNrY7K4zpK2JNJieG75T/UeS0otKauQ9jkUlXAIMrrZrG4tqTwIPkuypTqurdbGTjHK1Y6OCg9UL8SSPD93XNiLZ9BQi1CzL6wNggCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIDTUUrH+u0H4+avCpKHysWJxRNaLNAA5BRKTk7sE1UBAVnUEROYxtv4fEcVoq00rXIsiysyQgCAIAgCAIAgCAIAgCA//Z",
    date: "Sept 2024 – Dec 2024",
    achievements: [
      "Built a full-featured online shopping platform with user authentication, product catalog, and payment processing",
      "Implemented responsive front-end using React.js and back-end using Django REST framework",
      "Integrated PostgreSQL database with Redis caching for optimized performance.",
    ],
    technologies: [],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Task Management System",
    description: "",
    image:
      "https://terotam.com/wp-content/uploads/2022/07/Task-Management-software.png",
    date: "Feb 2024 – May 2024",
    achievements: [
      "Created a collaborative project management tool with task assignment, progress tracking, and deadline notifications",
      "Built RESTful API with Flask and SQL Alchemy ORM for database interactions",
      "Designed intuitive UI with React.js and implemented JWT authentication",
    ],
    technologies: [],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
  {
    title: "Real-Time Chat Application",
    description: "",
    image:
      "https://files.ably.io/ghost/prod/2023/01/build-a-realtime-chat-app-from-scratch--1-.png",
    date: "July 2024 – October 2024",
    achievements: [
      "Developed a scalable chat platform with private messaging and group chat functionality",
      "Utilized Django Channels for WebSocket connections and Redis for message queuing",
      "Implemented geolocation features and interactive data visualizations with Plotly to visualize the location of users.",
    ],
    technologies: [],
    demoUrl: "",
    githubUrl: "",
    award: undefined,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions across AI/ML, web development, and
            robotics
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200 border bg-card">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date}
                    </Badge>
                  </div>
                  {project.award && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                        <Award className="w-3 h-3 mr-1" />
                        {project.award}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                        asChild
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-2" />
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-3 h-3 mr-2" />
                          View Source
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
