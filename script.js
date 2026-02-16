// Book Database - 30+ books with detailed information
const booksData = [
    {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        price: 14.99,
        rating: 4.8,
        reviews: 2543,
        year: 1960,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
        summary: "Set in the Depression-era South, this Pulitzer Prize-winning novel tells the story of Scout Finch and her father Atticus, a lawyer who defends a black man falsely accused of rape. Through Scout's innocent eyes, we witness the moral courage required to fight injustice in a prejudiced society. The novel explores themes of racial inequality, moral education, and the loss of innocence. Harper Lee's masterpiece remains a cornerstone of American literature, teaching generations about empathy, compassion, and standing up for what's right even when faced with overwhelming opposition."
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        price: 13.99,
        rating: 4.7,
        reviews: 3421,
        year: 1949,
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
        summary: "In a totalitarian future where Big Brother watches everyone, Winston Smith works at the Ministry of Truth, rewriting history to suit the Party's needs. As he begins to question the regime and falls in love with Julia, Winston embarks on a dangerous journey toward truth and freedom. Orwell's dystopian masterpiece introduced concepts like thoughtcrime, doublethink, and Newspeak that have become part of our cultural vocabulary. The novel serves as a chilling warning about government surveillance, propaganda, and the manipulation of truth. Its relevance has only increased in our digital age, making it essential reading for understanding modern threats to freedom and privacy."
    },
    {
        id: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 12.99,
        rating: 4.6,
        reviews: 2876,
        year: 1925,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        summary: "Set in the Jazz Age of the 1920s, this quintessential American novel follows the mysterious millionaire Jay Gatsby and his obsessive love for the beautiful Daisy Buchanan. Narrated by Nick Carraway, the story unfolds in the lavish world of Long Island's elite, where parties, wealth, and excess mask deeper emptiness and moral decay. Fitzgerald crafts a brilliant critique of the American Dream, exploring themes of love, ambition, class, and the corruption that comes with wealth. The novel's lyrical prose and complex characters have made it a timeless classic, offering profound insights into American society that remain strikingly relevant today."
    },
    {
        id: 4,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        price: 18.99,
        rating: 4.9,
        reviews: 4532,
        year: 2014,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
        summary: "In this groundbreaking work, historian Yuval Noah Harari traces the history of humankind from the Stone Age to the present, exploring how Homo sapiens came to dominate the world. Through examining cognitive, agricultural, and scientific revolutions, Harari reveals how shared myths and collective fictions enabled humans to cooperate in large numbers and build complex civilizations. The book challenges conventional wisdom about human nature, religion, capitalism, and our place in the universe. With engaging prose and provocative ideas, Sapiens forces readers to reconsider what they thought they knew about humanity's past and contemplate our species' future in an age of artificial intelligence and biotechnology."
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        price: 16.99,
        rating: 4.8,
        reviews: 5621,
        year: 2018,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        summary: "James Clear presents a proven framework for improving every day through the power of tiny changes. Drawing on cutting-edge psychology and neuroscience, he explains why tiny changes lead to remarkable results and how to design good habits that stick while breaking bad ones. The book introduces the Four Laws of Behavior Change and shows how small improvements compound into life-changing transformations. Clear's practical strategies are backed by scientific research and real-world examples from business, sports, and life. Whether you want to lose weight, build a business, write a book, or achieve any other goal, Atomic Habits provides a clear roadmap for making meaningful progress."
    },
    {
        id: 6,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        category: "Fiction",
        price: 13.99,
        rating: 4.3,
        reviews: 2134,
        year: 1951,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        summary: "Holden Caulfield, a cynical teenager, narrates his experiences in New York City after being expelled from prep school. Over three days, he encounters various characters while wrestling with alienation, identity, and the phoniness of adult society. Salinger's novel captures the authentic voice of adolescent rebellion and angst, exploring themes of innocence, identity, and belonging. Holden's journey reflects the universal struggle of growing up and the desire to protect childhood innocence in a complex world. The novel's controversial status and enduring popularity among young readers have made it a cultural touchstone, sparking discussions about censorship, mental health, and the challenges of adolescence."
    },
    {
        id: 7,
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        category: "Psychology",
        price: 17.99,
        rating: 4.7,
        reviews: 3845,
        year: 2011,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
        summary: "Nobel laureate Daniel Kahneman reveals the two systems that drive how we think: System 1, which is fast, intuitive, and emotional, and System 2, which is slower, more deliberate, and logical. Through decades of research in psychology and behavioral economics, Kahneman explores the cognitive biases that affect our decisions, from overconfidence to loss aversion. The book demonstrates how our minds are prone to systematic errors and illusions, yet also capable of remarkable insights. Understanding these mental processes can help us make better decisions in business, relationships, and life. This groundbreaking work has transformed how we understand human judgment and decision-making."
    },
    {
        id: 8,
        title: "The Power of Habit",
        author: "Charles Duhigg",
        category: "Psychology",
        price: 15.99,
        rating: 4.6,
        reviews: 3298,
        year: 2012,
        image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=600&fit=crop",
        summary: "Charles Duhigg explores the science behind why habits exist and how they can be changed. Drawing on cutting-edge research and compelling case studies from business, sports, and everyday life, he reveals how understanding the habit loop—cue, routine, reward—can transform our lives and organizations. The book explains why some people and companies struggle to change despite years of trying, while others seem to remake themselves overnight. Duhigg shows that by harnessing the power of habit, we can exercise more regularly, lose weight, become more productive, and achieve success. The frameworks presented have helped millions of readers understand and modify their behavior patterns for lasting change."
    },
    {
        id: 9,
        title: "Educated",
        author: "Tara Westover",
        category: "Non-Fiction",
        price: 16.99,
        rating: 4.8,
        reviews: 4721,
        year: 2018,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
        summary: "Tara Westover recounts her extraordinary journey from growing up in a survivalist family in rural Idaho, where she had no formal education, to earning a PhD from Cambridge University. Her memoir explores themes of education, family loyalty, and the struggle between love and self-invention. Despite never attending school, she taught herself enough to gain admission to Brigham Young University, where she discovered a new world of ideas and possibilities. The book powerfully illustrates how education can be transformative, opening doors to different ways of thinking and living. Westover's story is both a testament to the power of learning and a poignant exploration of the price we sometimes pay for self-discovery and growth."
    },
    {
        id: 10,
        title: "Quiet",
        author: "Susan Cain",
        category: "Psychology",
        price: 16.99,
        rating: 4.7,
        reviews: 3567,
        year: 2012,
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
        summary: "Susan Cain argues that modern Western culture misunderstands and undervalues introverts, who make up a third to a half of the population. Drawing on psychological research and real-world examples, she reveals how society's bias toward extroversion has led us to overlook the talents and contributions of introverted individuals. The book explores the differences between introversion and extroversion, showing how introverts bring valuable qualities like deep thinking, creativity, and careful decision-making. Cain provides practical advice for introverts on how to thrive in an extrovert-centric world while encouraging everyone to recognize and appreciate the power of quiet. This groundbreaking work has sparked a cultural conversation about personality types and workplace dynamics."
    },
    {
        id: 11,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 14.99,
        rating: 4.6,
        reviews: 4123,
        year: 1988,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        summary: "This magical fable follows Santiago, an Andalusian shepherd boy, who dreams of finding treasure at the Egyptian pyramids. His journey becomes a quest for self-discovery as he learns to listen to his heart and follow his dreams. Along the way, he meets a king, an Englishman, and an alchemist who teach him about Personal Legends and the Soul of the World. Coelho weaves a simple yet profound tale about following your destiny, recognizing opportunities, and learning to read the omens life offers. The novel's universal themes of hope, determination, and the interconnectedness of all things have resonated with millions of readers worldwide, making it one of the best-selling books in history."
    },
    {
        id: 12,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Non-Fiction",
        price: 15.99,
        rating: 4.5,
        reviews: 5234,
        year: 1997,
        image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
        summary: "Robert Kiyosaki shares the financial lessons he learned from his two 'dads': his biological father (Poor Dad) and his best friend's father (Rich Dad). The book challenges conventional wisdom about money, work, and wealth creation, arguing that financial education—not found in traditional schools—is key to building wealth. Kiyosaki explains the difference between assets and liabilities, emphasizes the importance of financial literacy, and encourages entrepreneurship and investment. Through memorable anecdotes and straightforward advice, he teaches readers how to make money work for them rather than working for money. This influential book has transformed how millions think about personal finance and wealth building."
    },
    {
        id: 13,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        category: "Non-Fiction",
        price: 16.99,
        rating: 4.8,
        reviews: 4567,
        year: 2020,
        image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=400&h=600&fit=crop",
        summary: "Morgan Housel explores the strange ways people think about money and teaches how to make better financial decisions. Through 19 short stories, he reveals that doing well with money isn't necessarily about what you know, but how you behave. The book emphasizes that financial success is more about soft skills like patience, humility, and the ability to deal with uncertainty than technical knowledge. Housel shares timeless lessons about greed, fear, happiness, and contentment that apply to anyone trying to build wealth and find financial peace of mind. His engaging writing style and counterintuitive insights have made this book essential reading for anyone interested in personal finance and behavioral economics."
    },
    {
        id: 14,
        title: "Dune",
        author: "Frank Herbert",
        category: "Science",
        price: 17.99,
        rating: 4.7,
        reviews: 3821,
        year: 1965,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
        summary: "Set on the desert planet Arrakis, Dune tells the story of Paul Atreides, whose family accepts stewardship of the dangerous but valuable planet, the only source of the universe's most precious substance, melange or 'spice.' When Paul's family is betrayed, he must navigate deadly politics, mystical prophecies, and hostile forces to fulfill his destiny. Herbert created a richly detailed universe exploring themes of ecology, religion, politics, and human evolution. The novel's complex world-building, philosophical depth, and examination of power dynamics have influenced countless science fiction works. Dune remains a masterpiece that transcends its genre, offering profound insights into leadership, environmentalism, and the consequences of human ambition."
    },
    {
        id:15,
        title:"Rich Dad Poor Dad",
        author:"Robert Kiyosaki",
        category:"self-help",
        price:22.99,
        rating:4.5,
        year:1997,
        image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=400&h=600&fit=crop",
        summary:"It advocates the importance of financial literacy (financial education), financial independence and building wealth through investing in assets, real estate investing, starting and owning businesses, as well as increasing one's financial intelligence (financial IQ)."
    },
    {
        id: 16,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 14.99,
        rating: 4.8,
        reviews: 7821,
        year: 1997,
        image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop",
        summary: "Young Harry Potter discovers on his eleventh birthday that he's a wizard and begins his magical education at Hogwarts School of Witchcraft and Wizardry. There, he makes friends, learns spells, plays Quidditch, and uncovers the truth about his parents' mysterious death and his connection to the dark wizard Voldemort. Rowling creates a captivating magical world that exists parallel to our own, filled with memorable characters, imaginative details, and universal themes of friendship, courage, and the battle between good and evil. The novel launched a cultural phenomenon, inspiring millions of children and adults to discover the joy of reading. Its exploration of identity, belonging, and growing up has made it one of the most beloved book series of all time."
    },
    {
        id: 17,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        price: 13.99,
        rating: 4.7,
        reviews: 4532,
        year: 1937,
        image:"https://covers.openlibrary.org/b/id/6979861-L.jpg",
        summary: "Bilbo Baggins, a comfort-loving hobbit, is swept into an epic quest by the wizard Gandalf and a company of dwarves seeking to reclaim their homeland from the dragon Smaug. This adventure takes Bilbo far from his peaceful Shire, through dangerous lands filled with trolls, goblins, and giant spiders. Along the way, he discovers courage he never knew he had and a mysterious ring that will play a crucial role in Middle-earth's future. Tolkien's charming tale combines adventure, humor, and wisdom, introducing readers to his richly imagined fantasy world. The novel explores themes of personal growth, greed, heroism, and the unexpected strength found in unlikely heroes, setting the stage for The Lord of the Rings."
    },
    {
        id: 18,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Romance",
        price: 11.99,
        rating: 4.6,
        reviews: 3987,
        year: 1813,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
        summary: "Set in early 19th-century England, this beloved novel follows Elizabeth Bennet as she navigates issues of marriage, morality, and misconceptions. When the wealthy Mr. Darcy arrives in her neighborhood, Elizabeth's initial prejudice against his pride creates tension that masks their growing attraction. Austen crafts a witty social commentary on class, marriage, and women's limited options in her society. Through memorable characters and sparkling dialogue, she explores themes of love, family, social expectations, and personal growth. The novel's enduring popularity lies in its universal themes, brilliant characterization, and Austen's incisive observations about human nature. Elizabeth and Darcy's relationship has become the template for countless romantic stories."
    },
    {
        id: 19,
        title: "The Notebook",
        author: "Nicholas Sparks",
        category: "Romance",
        price: 13.99,
        rating: 4.5,
        reviews: 4321,
        year: 1996,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
        summary: "In a nursing home, an elderly man reads to a woman with Alzheimer's from a faded notebook, telling the story of Noah and Allie, two young lovers from different social classes who fall deeply in love one summer in the 1940s. Despite family opposition and years of separation, their love endures through letters, longing, and ultimately, a reunion that rekindles their romance. Sparks weaves a tender story about the enduring power of love and the heartbreak of memory loss. The novel explores themes of class differences, family pressure, choices, and the sacrifices we make for love. Its emotional depth and poignant ending have made it a modern classic of romantic literature."
    },
    {
        id: 20,
        title: "Gone Girl",
        author: "Gillian Flynn",
        category: "Mystery",
        price: 15.99,
        rating: 4.4,
        reviews: 5234,
        year: 2012,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
        summary: "On their fifth wedding anniversary, Amy Dunne disappears from her Missouri home, and all evidence points to her husband Nick as the prime suspect. As the investigation unfolds through alternating narratives from Nick and Amy's diary entries, a disturbing picture emerges of their marriage and the events leading to her disappearance. Flynn masterfully constructs a psychological thriller that challenges readers' perceptions with unreliable narrators and shocking twists. The novel explores themes of identity, marriage, media manipulation, and the masks people wear in relationships. Its complex characters and dark examination of modern marriage have made it a cultural phenomenon, sparking discussions about relationships, gender roles, and the nature of truth itself."
    },
    {
        id: 21,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        category: "Mystery",
        price: 14.99,
        rating: 4.3,
        reviews: 4567,
        year: 2003,
        image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
        summary: "Harvard symbologist Robert Langdon is called to the Louvre when the museum's curator is found murdered with cryptic symbols carved into his body. Working with cryptologist Sophie Neveu, Langdon uncovers a trail of clues hidden in famous artworks, leading to a shocking historical conspiracy involving the Catholic Church and the Holy Grail. Brown crafts a fast-paced thriller that blends art history, religious symbolism, and secret societies into an international treasure hunt. The novel explores themes of faith, knowledge, hidden history, and the power of secrets. Despite controversy over its historical claims, the book's compelling puzzles and breakneck pace have made it a worldwide phenomenon, introducing millions to art history and religious symbology."
    },
    {
        id: 22,
        title: "Sherlock Holmes: Complete Collection",
        author: "Arthur Conan Doyle",
        category: "Mystery",
        price: 19.99,
        rating: 4.8,
        reviews: 3876,
        year: 1887,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        summary: "This collection features the brilliant detective Sherlock Holmes and his loyal friend Dr. Watson as they solve complex cases through keen observation, logical reasoning, and deductive methods. From 'A Study in Scarlet' to 'The Adventure of Shoscombe Old Place,' Conan Doyle's stories have defined the detective genre for over a century. Holmes's methods revolutionized crime fiction, emphasizing forensic science and rational thinking long before they became standard police procedures. The stories explore Victorian society, human nature, and the thin line between genius and eccentricity. Holmes's enduring popularity as literature's greatest detective stems from the timeless appeal of puzzle-solving, justice, and the fascinating partnership between the brilliant but difficult detective and his steadfast companion."
    },
    {
        id: 23,
        title: "Man's Search for Meaning",
        author: "Viktor Frankl",
        category: "Philosophy",
        price: 14.99,
        rating: 4.8,
        reviews: 4123,
        year: 1946,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        summary: "Psychiatrist Viktor Frankl recounts his experiences as a concentration camp prisoner during World War II and describes his psychotherapeutic method of finding meaning in all forms of existence, even the most brutal. The book is divided into two parts: Frankl's harrowing experiences in the camps and his theory of logotherapy, which argues that our primary drive in life is not pleasure but the pursuit of meaning. Despite unimaginable suffering, Frankl observed that those who found meaning in their lives were more likely to survive. His profound insights into human resilience, purpose, and the will to meaning have influenced psychology, philosophy, and countless individuals facing adversity. This slim volume offers timeless wisdom about finding purpose and hope in any circumstance."
    },
    {
        id: 24,
        title: "Meditations",
        author: "Marcus Aurelius",
        category: "Philosophy",
        price: 12.99,
        rating: 4.7,
        reviews: 3456,
        year: 180,
        image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=600&fit=crop",
        summary: "Written as a series of personal notes by the Roman Emperor Marcus Aurelius, Meditations offers practical philosophy for daily life. Despite his position of absolute power, Aurelius reflects on themes of mortality, virtue, rationality, and living in harmony with nature. His Stoic philosophy emphasizes focusing on what we can control, accepting what we cannot, and finding tranquility through reason and virtue. The emperor's private thoughts reveal a thoughtful leader struggling with the same questions about meaning, duty, and character that concern us today. These timeless meditations on leadership, resilience, and personal ethics continue to inspire readers, from CEOs to students, offering a framework for living with wisdom, integrity, and inner peace in challenging times."
    },
    {
        id: 25,
        title: "The Republic",
        author: "Plato",
        category: "Philosophy",
        price: 15.99,
        rating: 4.6,
        reviews: 2345,
        year: -380,
        image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
        summary: "In this foundational work of Western philosophy, Plato presents a dialogue where Socrates and others discuss the nature of justice and whether a just person is happier than an unjust one. To answer this, Socrates constructs an ideal city in theory, exploring questions about government, education, art, and the nature of reality itself. The work introduces Plato's famous Theory of Forms, the Allegory of the Cave, and his controversial views on philosopher-kings. The Republic examines fundamental questions about truth, knowledge, the soul, and the good life that remain relevant today. Its influence on political philosophy, ethics, and education cannot be overstated, continuing to provoke thought and debate about how we should live and organize society."
    },
    {
        id: 26,
        title: "The Lean Startup",
        author: "Eric Ries",
        category: "Technology",
        price: 16.99,
        rating: 4.5,
        reviews: 3678,
        year: 2011,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
        summary: "Eric Ries presents a revolutionary approach to creating and managing successful startups in an age of uncertainty. The Lean Startup methodology advocates for building a minimum viable product, measuring its performance, and learning from customer feedback to iterate rapidly. Ries challenges traditional business planning and embraces validated learning, where entrepreneurs test their vision continuously and adapt based on evidence rather than assumptions. The book introduces concepts like the Build-Measure-Learn feedback loop, pivot or persevere decisions, and innovation accounting. These principles have transformed how companies of all sizes approach product development and innovation. Ries provides practical frameworks and real-world examples that help entrepreneurs reduce waste, increase their odds of success, and build sustainable businesses."
    },
    {
        id: 27,
        title: "Steve Jobs",
        author: "Walter Isaacson",
        category: "Technology",
        price: 18.99,
        rating: 4.7,
        reviews: 4890,
        year: 2011,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
        summary: "Based on over forty interviews with Steve Jobs and hundreds of interviews with family, friends, competitors, and colleagues, Walter Isaacson chronicles the roller-coaster life and intense personality of the creative entrepreneur whose passion for perfection revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing. The biography reveals Jobs's complexities—his perfectionism, his intensity, and his sometimes cruel treatment of others—while showing how these traits were inseparable from his creative genius. Isaacson explores how Jobs's intuitive sense of design, love of simplicity, and ability to connect humanities with technology made him the ultimate innovator. This definitive portrait offers lessons about innovation, character, leadership, and values that resonate far beyond technology."
    },
    {
        id: 28,
        title: "The Innovator's Dilemma",
        author: "Clayton Christensen",
        category: "Technology",
        price: 17.99,
        rating: 4.6,
        reviews: 2987,
        year: 1997,
        image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=600&fit=crop",
        summary: "Clayton Christensen explores why successful companies can do everything right yet still lose market leadership when confronted with disruptive technological change. Through detailed case studies from industries including disk drives, steel, and retail, he demonstrates how market-leading firms fail not because they do a bad job of managing their business, but because they do an excellent job. They listen to customers, invest in innovation, and make rational decisions—yet miss disruptive innovations that initially serve fringe markets with inferior products. Christensen's framework of sustaining versus disruptive innovation has become essential for understanding technological change and competitive dynamics. The book offers critical insights for managers about how to navigate innovation, when to ignore customers, and how to balance serving existing markets while exploring new opportunities."
    },
    {
        id: 29,
        title: "The Intelligent Investor",
        author: "Benjamin Graham",
        category: "Non-Fiction",
        price: 22.99,
        rating: 4.7,
        reviews: 3456,
        year: 1949,
        image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=400&h=600&fit=crop",
        summary: "Benjamin Graham's classic text on value investing has educated generations of investors since its first publication. Graham teaches a philosophy of 'value investing' that protects investors from substantial errors and teaches them to develop long-term strategies. His principles of investing in stocks at less than their intrinsic value, maintaining a margin of safety, and thinking like a business owner rather than a speculator remain as relevant today as when first written. Warren Buffett called it 'the best book on investing ever written.' Graham distinguishes between investment and speculation, introduces the concept of 'Mr. Market' to explain market fluctuations, and emphasizes the importance of emotional discipline. This timeless guide provides a framework for making sound investment decisions and building wealth over the long term."
    },
    {
        id: 30,
        title: "Becoming",
        author: "Michelle Obama",
        category: "Non-Fiction",
        price: 19.99,
        rating: 4.9,
        reviews: 6234,
        year: 2018,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
        summary: "In her memoir, former First Lady Michelle Obama chronicles her life from her childhood on the South Side of Chicago to her years in the White House. With honesty and grace, she describes her triumphs and disappointments, both public and private, telling her full story as she lived it—in her own words and on her own terms. Obama writes about her roots and how they shaped her, her time as a working mother balancing career and family, and her time in the most famous address in the world. She reflects on her role as the first African American First Lady and her work advocating for girls and women. Becoming is an inspiring memoir about a woman finding her voice, pursuing her dreams, and using her platform to make a difference. It's a story about resilience, hope, and the power of believing in yourself."
    },
    { 
        id:31,
        title:"The 7 Habits of Highly Effective People",
        author:"Stephen R. Covey",
        category:"Self-Help",
        price:580,
        rating:4.8,
        year:1989,
        image:"https://covers.openlibrary.org/b/id/240726-L.jpg",
        summary:"Principles for personal and professional effectiveness."
    },
    {
        id:32,
        title:"Brave New World",
        author:"Aldous Huxley",
        category:"Fiction",
        price:400,
        rating:4.4,
        year:1932,
        image:"https://covers.openlibrary.org/b/id/8776041-L.jpg",
        summary:"A dystopian novel about a technologically controlled society."
    },
    {
        id:33,
        title:"The Silent Patient",
        author:"Alex Michaelides",
        category:"Mystery",
        price:480,
        rating:4.6,
        year:2019,
        image:"https://covers.openlibrary.org/b/id/9259254-L.jpg",
        summary:"A psychological thriller about a woman who refuses to speak after committing a crime."
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('pageturncart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadFeaturedBooks();
    loadBestsellerBooks();
    loadAllBooks();
    loadCategories();
    updateCartBadge();
    setupEventListeners();
    setupNavigation();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
            
            // Handle category filtering from footer
            if (this.hasAttribute('data-category')) {
                const category = this.getAttribute('data-category');
                filterByCategory(category);
            }
        });
    });
}

function navigateToPage(pageName) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');
    
    // Update cart display if navigating to cart
    if (pageName === 'cart') {
        displayCart();
    }
}

// Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', function() {
        document.getElementById('navMenu').classList.toggle('active');
    });
    
    // Newsletter form
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    // Search functionality
    document.getElementById('bookSearch').addEventListener('input', function(e) {
        searchBooks(e.target.value);
    });
    
    // Category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // Sort functionality
    document.getElementById('sortSelect').addEventListener('change', function(e) {
        sortBooks(e.target.value);
    });
    
    // Modal close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', closeModal);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', proceedToCheckout);
}

// Load Books Functions
function loadFeaturedBooks() {
    const featuredContainer = document.getElementById('featuredBooks');
    const featured = booksData.slice(0, 8);
    featuredContainer.innerHTML = featured.map(book => createBookCard(book)).join('');
}

function loadBestsellerBooks() {
    const bestsellerContainer = document.getElementById('bestsellerBooks');
    const bestsellers = booksData.sort((a, b) => b.reviews - a.reviews).slice(0, 8);
    bestsellerContainer.innerHTML = bestsellers.map(book => createBookCard(book)).join('');
}

function loadAllBooks() {
    const allBooksContainer = document.getElementById('allBooks');
    allBooksContainer.innerHTML = booksData.map(book => createBookCard(book)).join('');
}

// Create Book Card HTML
function createBookCard(book) {
    return `
        <div class="book-card" data-id="${book.id}">
            <img src="${book.image}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <span class="book-category">${book.category}</span>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <div class="book-rating">
                    <div class="stars">
                        ${createStars(book.rating)}
                    </div>
                    <span class="rating-count">(${book.reviews})</span>
                </div>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <div class="book-actions">
                    <button class="btn-add-cart" onclick="addToCart(${book.id})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-preview" onclick="showBookPreview(${book.id})">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Search and Filter Functions
function searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = booksData.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) || 
        book.author.toLowerCase().includes(lowerQuery)
    );
    displayFilteredBooks(filtered);
}

function filterByCategory(category) {
    if (category === 'all') {
        loadAllBooks();
    } else {
        const filtered = booksData.filter(book => book.category === category);
        displayFilteredBooks(filtered);
    }
}

function sortBooks(sortType) {
    let sorted = [...booksData];
    
    switch(sortType) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        default:
            sorted = booksData;
    }
    
    displayFilteredBooks(sorted);
}

function displayFilteredBooks(books) {
    const container = document.getElementById('allBooks');
    if (books.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-secondary);">No books found matching your criteria.</p>';
    } else {
        container.innerHTML = books.map(book => createBookCard(book)).join('');
    }
}

// Categories
function loadCategories() {
    const categories = [
        { name: 'Fiction', count: booksData.filter(b => b.category === 'Fiction').length, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop' },
        { name: 'Non-Fiction', count: booksData.filter(b => b.category === 'Non-Fiction').length, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=400&fit=crop' },
        { name: 'Psychology', count: booksData.filter(b => b.category === 'Psychology').length, image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop' },
        { name: 'Science', count: booksData.filter(b => b.category === 'Science').length, image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop' },
        { name: 'Technology', count: booksData.filter(b => b.category === 'Technology').length, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop' },
        { name: 'Fantasy', count: booksData.filter(b => b.category === 'Fantasy').length, image: 'https://images.unsplash.com/photo-1614544048536-0d28caf77200?w=600&h=400&fit=crop' },
        { name: 'Romance', count: booksData.filter(b => b.category === 'Romance').length, image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&h=400&fit=crop' },
        { name: 'Mystery', count: booksData.filter(b => b.category === 'Mystery').length, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop' },
        { name: 'Self-Help', count: booksData.filter(b => b.category === 'Self-Help').length, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop' },
        { name: 'Philosophy', count: booksData.filter(b => b.category === 'Philosophy').length, image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=400&fit=crop' }
    ];
    
    const container = document.getElementById('categoriesGrid');
    container.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="navigateToCategory('${cat.name}')">
            <img src="${cat.image}" alt="${cat.name}" class="category-bg">
            <div class="category-content">
                <h3 class="category-name">${cat.name}</h3>
                <p class="category-count">${cat.count} Books</p>
                <i class="fas fa-arrow-right category-arrow"></i>
            </div>
        </div>
    `).join('');
}

function navigateToCategory(categoryName) {
    navigateToPage('books');
    filterByCategory(categoryName);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === categoryName) {
            btn.classList.add('active');
        }
    });
}

// Modal Functions
function showBookPreview(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.getElementById('bookModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-book">
            <img src="${book.image}" alt="${book.title}" class="modal-book-cover">
            <div class="modal-book-details">
                <h2>${book.title}</h2>
                <p class="modal-book-author">by ${book.author}</p>
                <div class="modal-book-meta">
                    <div class="meta-item">
                        <span class="meta-label">Genre</span>
                        <span class="meta-value">${book.category}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Year</span>
                        <span class="meta-value">${book.year}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Rating</span>
                        <span class="meta-value">${book.rating} / 5</span>
                    </div>
                </div>
                <div class="modal-book-rating">
                    <div class="stars">
                        ${createStars(book.rating)}
                    </div>
                    <span>(${book.reviews} reviews)</span>
                </div>
                <p class="modal-book-price">$${book.price.toFixed(2)}</p>
                <div class="modal-book-summary">
                    <h3>About This Book</h3>
                    <p>${book.summary}</p>
                </div>
                <div class="modal-book-actions">
                    <button class="btn btn-primary btn-full" onclick="addToCart(${book.id}); closeModal();">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cart Functions
function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }
    
    saveCart();
    updateCartBadge();
    showNotification('Book added to cart!');
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    saveCart();
    updateCartBadge();
    displayCart();
}

function updateQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(bookId);
    } else {
        saveCart();
        displayCart();
    }
}

function saveCart() {
    localStorage.setItem('pageturncart', JSON.stringify(cart));
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = totalItems;
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartContent = document.getElementById('cartContent');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-author">by ${item.author}</p>
                <span class="cart-item-category">${item.category}</span>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${subtotal.toFixed(2)}`;
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    
    // Create order summary
    const orderSummary = cart.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price
    }));
    
    // Display order summary on checkout page
    const orderSummaryContainer = document.getElementById('orderSummary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderSummaryContainer.innerHTML = `
        <h3>Order Details</h3>
        ${cart.map(item => `
            <div class="order-item">
                <span>${item.title} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="order-item" style="font-weight: 700; font-size: 18px; color: var(--primary-color); margin-top: 16px; padding-top: 16px; border-top: 2px solid var(--border-color);">
            <span>Total</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
    `;
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();
    
    // Navigate to checkout page
    navigateToPage('checkout');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: var(--primary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add slide animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
