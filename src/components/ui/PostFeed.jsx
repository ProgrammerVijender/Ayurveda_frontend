import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";

const posts = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar: "https://i.pravatar.cc/150?img=32",
      initials: "SJ",
    },
    content:
      "Just discovered this amazing Ayurvedic tea blend that's perfect for balancing Vata dosha during these cold winter months! The combination of ginger, cardamom, and cinnamon is so warming and grounding. #AyurvedicWellness #WinterWellness",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2342&auto=format&fit=crop",
    postedAt: "2 hours ago",
    likes: 42,
    comments: 7,
  },
  {
    id: 2,
    user: {
      name: "Raj Patel",
      username: "@rajpatel",
      avatar: "https://i.pravatar.cc/150?img=11",
      initials: "RP",
    },
    content:
      "Today's Ayurvedic tip: Oil pulling with organic sesame or coconut oil for 10-15 minutes each morning can improve oral health, detoxify the body, and even help with sinus issues. It's an ancient practice with modern benefits! Who else does this as part of their dinacharya (daily routine)?",
    postedAt: "5 hours ago",
    likes: 87,
    comments: 23,
  },
  {
    id: 3,
    user: {
      name: "Maya Singh",
      username: "@mayaheals",
      avatar: "https://i.pravatar.cc/150?img=25",
      initials: "MS",
    },
    content:
      "I'm hosting a free workshop next weekend on Ayurvedic cooking basics! Learn how to incorporate the six tastes into your meals and cook according to your dosha. Limited spots available - link in bio to register! #AyurvedicCooking #HolisticNutrition",
    image: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?q=80&w=2340&auto=format&fit=crop",
    postedAt: "Yesterday",
    likes: 103,
    comments: 31,
  },
];

const PostFeed = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="post-card animate-fade-in">
          <div className="flex items-start gap-3 mb-4">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{post.user.name}</h3>
                <span className="text-muted-foreground text-sm">{post.user.username}</span>
              </div>
              <p className="text-xs text-muted-foreground">{post.postedAt}</p>
            </div>
          </div>
          
          <p className="mb-4 text-ayurveda-dark">{post.content}</p>
          
          {post.image && (
            <div className="mb-4 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt="Post" 
                className="w-full h-auto object-cover max-h-96"
              />
            </div>
          )}
          
          <div className="flex items-center gap-6 pt-2 border-t border-ayurveda-secondary">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-2 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-muted-foreground'}`}
              onClick={() => handleLike(post.id)}
            >
              <Heart size={18} className={likedPosts.includes(post.id) ? 'fill-red-500' : ''} />
              <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-muted-foreground"
            >
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Share size={18} />
            </Button>
          </div>
        </div>
      ))}
      
      <div className="p-4 text-center">
        <Button variant="outline" className="border-ayurveda-secondary text-ayurveda-primary hover:bg-ayurveda-secondary">
          Load more posts
        </Button>
      </div>
    </div>
  );
};

export default PostFeed;
