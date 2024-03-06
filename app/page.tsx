"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/form-schema/schema";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDropzone } from "react-dropzone";
import { UserRound } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const employeeCounts = ["1-10", "10-100", "100-500", "1000+"];

const fundingRounds = ["Series A", "Series B", "Series C"];

const settingsTabs = [
  { label: "Your Profile", value: "profile", isDisabled: false },
  { label: "Company Info", value: "company-info", isDisabled: false },
  { label: "Manage Seats", value: "manage-seats", isDisabled: false },
  { label: "Do not Contact", value: "do-not-contact", isDisabled: false },
  { label: "Integrations", value: "integrations", isDisabled: false },
];

export default function Home() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      if (!acceptedFiles[0].type.includes("image")) {
        toast({
          description: "Image required",
          variant: "destructive",
          duration: 5000,
        });

        return;
      }

      if (acceptedFiles[0].size > 1000000) {
        toast({
          description: "File size should not exceed 1MB",
          variant: "destructive",
          duration: 5000,
        });

        return;
      }

      setImage(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      companyLinkedIn: "",
      companyIndustry: "",
      companyDescription: "",
      companyGoals: "",
      companyHeadquarters: "",
      fundingRound: "Series A",
      faqsUrl: "",
      emplyeeCount: "1-10",
    },
  });

  const imageUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : ""),
    [image]
  );

  function handleSelectImage() {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1000000) {
        toast({
          description: "File size should not exceed 1MB",
          variant: "destructive",
          duration: 5000,
        });

        return;
      }

      setImage(file);
    }
  }

  function handleRemoveImage() {
    setImage(null);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      description: "Settings updated successfully",
      variant: "primary",
      duration: 5000,
    });
  }

  return (
    <main className="p-5 space-y-5 max-w-[1204px] mx-auto md:space-y-10 md:py-10 md:px-20">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Settings</h1>

      <Tabs defaultValue="company-info">
        <div className="w-full overflow-x-auto">
          <TabsList>
            {settingsTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.isDisabled}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="company-info">
          <div {...getRootProps()} className="w-full" onClick={() => {}}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full mt-5 md:mt-10"
              >
                <div className="w-full flex flex-col space-y-5 md:space-0 md:items-start md:justify-between md:flex-row-reverse">
                  <div className="w-full grid grid-cols-2 gap-3 md:w-auto md:flex">
                    <Button type="button" size="sm" variant="outline">
                      Cancel
                    </Button>

                    <Button type="submit" size="sm">
                      Save changes
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Avatar
                      className="h-[108px] w-[108px]"
                      onClick={handleSelectImage}
                    >
                      <AvatarImage src={imageUrl} />
                      <AvatarFallback>
                        <UserRound className="h-10 w-10" />
                      </AvatarFallback>
                      <input
                        {...getInputProps()}
                        type="file"
                        name="profile-image"
                        id="profile-image"
                        className="hidden"
                        accept="image/png, image/svg+xml, image/jpeg"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                      />
                    </Avatar>

                    <div className="space-y-3">
                      <div className="w-full space-x-3 md:w-auto">
                        <Button
                          size="sm"
                          variant="destructive"
                          type="button"
                          onClick={handleRemoveImage}
                        >
                          Remove
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          onClick={handleSelectImage}
                        >
                          Change Photo
                        </Button>
                      </div>

                      <p className="text-sm">
                        or drag and drop (SVG, PNG, JPG)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-7">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company’s Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Sixteen Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company’s Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://sixteen.life/"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyLinkedIn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company’s Linkedin</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.linkedin.com/company/sixteenlife"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyIndustry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company’s Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Digital Wellbeing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="col-span-1 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="emplyeeCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee Count</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-1"
                            >
                              {employeeCounts.map((count) => (
                                <FormItem key={count}>
                                  <FormLabel>
                                    <div
                                      className={`rounded-full border text-sm py-2 px-3 cursor-pointer ${
                                        field.value === count
                                          ? "bg-primary text-primary-foreground border-primary"
                                          : "text-primary border-input"
                                      }`}
                                    >
                                      <FormControl>
                                        <RadioGroupItem
                                          value={count}
                                          className="hidden"
                                        />
                                      </FormControl>
                                      {count}
                                    </div>
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="companyDescription"
                      render={({ field, formState }) => (
                        <FormItem>
                          <FormLabel>Company description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Redesign your digital life, reduce your screen time"
                              {...field}
                              rows={1}
                            />
                          </FormControl>
                          {formState.errors.companyDescription ? (
                            <FormMessage />
                          ) : (
                            <FormDescription>
                              Your detailed company description
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="companyGoals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are your company goals?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Help everyone to be more conscious of where they are spending their time"
                              {...field}
                              rows={1}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="companyHeadquarters"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Headquarters</FormLabel>
                          <FormControl>
                            <Input placeholder="Delhi, India" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="fundingRound"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Round</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Funding Round" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Funding Rounds</SelectLabel>

                                {fundingRounds.map((round) => (
                                  <SelectItem key={round} value={round}>
                                    {round}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="faqsUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>FAQs</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://sixteen.life/faq"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>

            {isDragActive && (
              <div className="fixed inset-0 h-screen w-full flex flex-col items-center justify-center space-y-3 bg-black bg-opacity-50">
                <UserRound className="text-white h-40 w-40" />
                <p className="font-semibold text-foreground text-white">Drop</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
