import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const profiles = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahj",
    avatar: "https://i.pravatar.cc/150?img=32",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Mike Williams",
    username: "@mikew",
    avatar: "https://i.pravatar.cc/150?img=54",
    initials: "MW",
  },
  {
    id: 3,
    name: "Emily Davis",
    username: "@emilyd",
    avatar: "https://i.pravatar.cc/150?img=47",
    initials: "ED",
  },
];

const SuggestedProfiles = () => {
  return (
    <div className="bg-white rounded-2xl border border-ayurveda-secondary p-6">
      <h2 className="text-lg font-semibold mb-4">Other User Profiles</h2>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.initials}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-sm">{profile.name}</p>
                <p className="text-muted-foreground text-xs">{profile.username}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs h-8 border-ayurveda-primary text-ayurveda-primary hover:bg-ayurveda-primary hover:text-white">
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedProfiles;