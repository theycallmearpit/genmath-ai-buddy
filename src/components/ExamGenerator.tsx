import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Calculator, BookOpen, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExamQuestion {
  question: string;
  answer: string;
  explanation?: string;
}

const ExamGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState('5');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const mathTopics = [
    "Addition", "Subtraction", "Multiplication", "Division",
    "Fractions", "Decimals", "Percentages", "Algebra",
    "Geometry", "Trigonometry", "Calculus", "Statistics"
  ];

  const generateExam = async () => {
    if (!topic.trim()) {
      toast({
        title: "Missing Topic",
        description: "Please enter a math topic to generate questions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError('');
    setQuestions([]);

    try {
      // Simulate API call - in real implementation, this would call the backend
      // For now, we'll generate mock questions
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockQuestions: ExamQuestion[] = Array.from({ length: parseInt(questionCount) }, (_, i) => ({
        question: `Sample ${topic} question ${i + 1}: What is the result of this ${topic.toLowerCase()} problem?`,
        answer: `Answer ${i + 1}`,
        explanation: `This is how you solve this ${topic.toLowerCase()} problem step by step.`
      }));

      setQuestions(mockQuestions);
      toast({
        title: "Exam Generated!",
        description: `Successfully generated ${questionCount} ${topic} questions.`,
      });
    } catch (err) {
      const errorMessage = "Failed to generate exam. Please try again.";
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              GenMath AI Buddy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate personalized math exams instantly with AI. Choose your topic, set the difficulty, and get practice questions tailored to your learning needs.
          </p>
        </div>

        {/* Generator Form */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Create Your Math Exam
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Math Topic</Label>
                <div className="relative">
                  <Input
                    id="topic"
                    placeholder="e.g., Algebra, Fractions, Calculus"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="pr-4"
                    list="topics"
                  />
                  <datalist id="topics">
                    {mathTopics.map((mathTopic) => (
                      <option key={mathTopic} value={mathTopic} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">Number of Questions</Label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 25].map((count) => (
                      <SelectItem key={count} value={count.toString()}>
                        {count} questions
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={generateExam} 
              disabled={isLoading}
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Exam...
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-5 w-5" />
                  Generate Exam
                </>
              )}
            </Button>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generated Questions */}
        {questions.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-bold">Your {topic} Exam</h2>
              <span className="text-muted-foreground">({questions.length} questions)</span>
            </div>
            
            <div className="grid gap-6">
              {questions.map((question, index) => (
                <Card key={index} className="shadow-md border-l-4 border-l-primary bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {question.question}
                        </h3>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Answer:</p>
                          <p className="font-medium">{question.answer}</p>
                        </div>
                        {question.explanation && (
                          <div className="p-3 bg-secondary/10 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Explanation:</p>
                            <p className="text-sm">{question.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamGenerator;