import { useState } from "react";
import { ChevronRight, User, Lock, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import mascotOwl from "@/assets/mascot-owl.png";

interface AuthProps {
  onLogin: () => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gradeLevel: "",
    subjects: [] as string[],
  });

  const subjects = [
    "Mathematics", "Science", "English", "History", "Art", "Music", "Physical Education", "Computer Science"
  ];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subject]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        subjects: prev.subjects.filter(s => s !== subject)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="card-glass w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-gradient text-3xl font-bold">
              {isLogin ? "Welcome Back!" : "Join EduLearn"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? "Sign in to continue your learning journey" : "Start your educational adventure today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                className="transition-all duration-300 focus:shadow-glow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="transition-all duration-300 focus:shadow-glow"
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="grade" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Grade Level
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gradeLevel: value }))}>
                    <SelectTrigger className="transition-all duration-300 focus:shadow-glow">
                      <SelectValue placeholder="Select your grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`grade-${i + 1}`}>
                          Grade {i + 1}
                        </SelectItem>
                      ))}
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="adult">Adult Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Subjects of Interest
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={formData.subjects.includes(subject)}
                          onCheckedChange={(checked) => 
                            handleSubjectChange(subject, checked as boolean)
                          }
                        />
                        <Label htmlFor={subject} className="text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLogin ? "Sign In" : "Sign Up"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary-glow transition-colors duration-300"
            >
              {isLogin ? "Not a user? Sign up" : "Already a user? Login"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration & Mascot */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <div className="relative">
            <img 
              src={mascotOwl} 
              alt="EduLearn Mascot Owl"
              className="w-64 h-64 mascot-bounce cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => {
                // Easter egg counter logic would go here
                console.log("Mascot clicked!");
              }}
            />
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-achievement rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Welcome to EduLearn
            </h2>
            <p className="text-xl text-white/80 max-w-md">
              Your personalized learning companion that makes education fun, engaging, and effective.
            </p>
            
            <div className="flex justify-center space-x-4 mt-8">
              <div className="card-glass p-4 text-center">
                <div className="text-2xl font-bold text-gradient">1000+</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
              <div className="card-glass p-4 text-center">
                <div className="text-2xl font-bold text-gradient">50k+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="card-glass p-4 text-center">
                <div className="text-2xl font-bold text-gradient">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;