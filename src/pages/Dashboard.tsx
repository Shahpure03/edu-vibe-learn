import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Bell, 
  Star, 
  Flame, 
  CheckCircle,
  PlayCircle,
  Clock,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import mascotOwl from "@/assets/mascot-owl.png";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [mascotClicks, setMascotClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [idleTimeout, setIdleTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showIdleMessage, setShowIdleMessage] = useState(false);

  const dailyGoals = [
    { id: 1, title: "Watch 2 videos", completed: 1, total: 2, icon: PlayCircle },
    { id: 2, title: "Complete 3 exercises", completed: 3, total: 3, icon: CheckCircle },
    { id: 3, title: "Read for 30 minutes", completed: 20, total: 30, icon: BookOpen },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Advanced Algebra",
      description: "Master quadratic equations and functions",
      thumbnail: "🔢",
      duration: "45 min",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "World History: Renaissance",
      description: "Explore the cultural rebirth of Europe",
      thumbnail: "🎨",
      duration: "30 min",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Chemistry Basics",
      description: "Understanding atomic structure",
      thumbnail: "⚗️",
      duration: "60 min",
      difficulty: "Intermediate"
    }
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Completed first lesson", icon: Star, earned: true },
    { id: 2, title: "Streak Master", description: "7-day learning streak", icon: Flame, earned: true },
    { id: 3, title: "Quick Learner", description: "Finished 5 lessons in a day", icon: Zap, earned: false },
    { id: 4, title: "Knowledge Seeker", description: "Explored 3 subjects", icon: Award, earned: true },
  ];

  const notifications = [
    { id: 1, message: "New chemistry lesson available!", time: "2 min ago", type: "lesson" },
    { id: 2, message: "Assignment due tomorrow", time: "1 hour ago", type: "deadline" },
    { id: 3, message: "Congratulations on your 7-day streak!", time: "3 hours ago", type: "achievement" },
  ];

  const funFacts = [
    "Did you know? Octopuses have three hearts! 🐙",
    "Fun fact: Honey never spoils! 🍯",
    "Amazing: A group of flamingos is called a 'flamboyance'! 🦩",
    "Cool fact: Bananas are berries, but strawberries aren't! 🍌",
    "Wow: The shortest war in history lasted only 38-45 minutes! ⚔️"
  ];

  const handleMascotClick = () => {
    const newClickCount = mascotClicks + 1;
    setMascotClicks(newClickCount);
    
    if (newClickCount === 5) {
      setShowEasterEgg(true);
      setMascotClicks(0);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
  };

  const resetIdleTimer = () => {
    if (idleTimeout) {
      clearTimeout(idleTimeout);
    }
    setShowIdleMessage(false);
    
    const timeout = setTimeout(() => {
      setShowIdleMessage(true);
      setTimeout(() => setShowIdleMessage(false), 3000);
    }, 20000);
    
    setIdleTimeout(timeout);
  };

  useEffect(() => {
    resetIdleTimer();
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
    };
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={mascotOwl} 
            alt="EduLearn Mascot"
            className="w-12 h-12 cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={handleMascotClick}
          />
          <div>
            <h1 className="text-3xl font-bold text-white">Good morning, Alex! 🌅</h1>
            <p className="text-white/80">Ready to learn something amazing today?</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button onClick={onLogout} variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
            Logout
          </Button>
        </div>
      </div>

      {/* Daily Goals */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Daily Learning Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyGoals.map((goal) => {
            const Icon = goal.icon;
            const progress = (goal.completed / goal.total) * 100;
            
            return (
              <div key={goal.id} className="flex items-center gap-4">
                <Icon className={`h-5 w-5 ${progress === 100 ? 'text-success' : 'text-muted-foreground'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.completed}/{goal.total}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                {progress === 100 && (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Smart Recommendations */}
        <div className="lg:col-span-2">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="text-4xl">{rec.thumbnail}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {rec.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rec.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button className="btn-primary">
                    Start Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Achievements & Stats */}
        <div className="space-y-6">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      achievement.earned 
                        ? 'achievement-glow text-white' 
                        : 'bg-white/5 text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <div>
                      <div className="font-semibold text-sm">{achievement.title}</div>
                      <div className="text-xs opacity-80">{achievement.description}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">7</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-primary">42</div>
                  <div className="text-xs text-muted-foreground">Lessons</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-accent">1,250</div>
                  <div className="text-xs text-muted-foreground">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="card-glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-slide p-3 rounded-lg bg-white/10">
                  <div className="text-sm font-medium">{notification.message}</div>
                  <div className="text-xs text-muted-foreground">{notification.time}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card-glass p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Easter Egg Unlocked!</h3>
            <p className="text-muted-foreground mb-4">
              {funFacts[Math.floor(Math.random() * funFacts.length)]}
            </p>
            <Button onClick={() => setShowEasterEgg(false)} className="btn-primary">
              Cool! Thanks!
            </Button>
          </div>
        </div>
      )}

      {/* Idle Message */}
      {showIdleMessage && (
        <div className="fixed bottom-20 right-8 card-glass p-4 max-w-xs">
          <div className="flex items-center gap-3">
            <img src={mascotOwl} alt="Mascot" className="w-8 h-8" />
            <div>
              <div className="text-sm font-medium">Hey there! 👋</div>
              <div className="text-xs text-muted-foreground">
                Ready to continue learning? I believe in you!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;