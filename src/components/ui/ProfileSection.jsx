import { LogOut, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "react-toastify";
// import { ToastContainer } 
import "react-toastify/dist/ReactToastify.css";

const ProfileSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, you would handle the logout logic
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/login");
  };

  return (
    <div className="bg-white rounded-2xl border border-ayurveda-secondary p-6 text-center">
      <div className="flex justify-center mb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://i.pravatar.cc/150?img=28" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
      <h2 className="text-xl font-semibold mb-1">John Doe</h2>
      <p className="text-ayurveda-accent text-sm mb-4">@johndoe</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-ayurveda-primary">
            <Users size={16} />
            <span className="font-semibold">458</span>
          </div>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 text-ayurveda-primary">
            <User size={16} />
            <span className="font-semibold">213</span>
          </div>
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full border-ayurveda-secondary hover:bg-ayurveda-secondary hover:text-ayurveda-dark flex gap-2 items-center justify-center"
        onClick={handleLogout}
      >
        <LogOut size={16} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default ProfileSection;
