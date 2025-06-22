import defaultImg from "../../assets/images/default.svg";
import { Form } from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Loader2, Pencil, Trash } from "lucide-react";
import { Fragment, useEffect, useState, useMemo, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useUserProfileMaster } from "@/services/fetchUserProfile";
import Loader from "@/components/loader/Loader";
import { UseRenderFields } from "@/hooks/useRenderFields";
import Header from "@/components/header/Header";
import { Button } from "@/components/ui/button";
import { getOptions } from "@/lib/utils";

interface LoginFormField {
  fieldId: string;
  fieldName: string;
  fieldValueType: string;
  defaultCaption: string;
  isMandatory: boolean;
  isLabelDisplay?: boolean;
  enableImageView?: boolean;
  options?: any[];
  Searchable?: boolean;
}

interface UserProfileFormData {
  profilePicture?: File | null;
  userName?: string;
  email?: string;
  password?: string;
  age?: number;
  state?: string;
  city?: string[];
  file?: File | null;
  birthdate?: string; // or Date, depends on your Datepicker implementation
  [key: string]: any;
}

interface StateType {
  stateName: string;
  stateId: string;
}
function UserProfile() {
  const queryClient = useQueryClient();

  // Initialize forms
  const form = useForm<UserProfileFormData>();
  const [profilePhoto, setProfilePhoto] = useState<string>(defaultImg);
  const [profileData, setProfileData] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    updateUserProfileDetails,
  } = useUserProfileMaster();

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  const onSubmit = (data: UserProfileFormData) => {
    console.log('data :>> ', data);
    // if (!isDirty) return;
    // updateUserProfileDetails.mutate({
    //   ...data,
    //   userLogo: profileData === null ? data.profilePicture : profileData,
    // });
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setProfileData(file || null);

    if (file) {
      setValue("profilePicture", file, { shouldValidate: true });
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);
    } else {
      setValue("profilePicture", null);
      setProfilePhoto(defaultImg);
    }
  };

  const handleCancelButton = () => {
    reset();
    setProfilePhoto(defaultImg);
  };

  const handleDeleteProfilePhoto = () => {
    setProfilePhoto(defaultImg);
    setValue("profilePicture", null);
    setProfileData(null);
  };

  const states: StateType[] = [
    { stateName: "Admin", stateId: "admin" },
    { stateName: "User", stateId: "user" },
    { stateName: "Guest", stateId: "guest" },
  ];

  const dropdownOptionsMap = useMemo(
    () => ({
      state: getOptions(states, "stateId", "stateName"),
    }),
    [states]
  );


  const loginFormFields: LoginFormField[] = [
    {
      fieldId: "3",
      fieldName: "password",
      fieldValueType: "PASSWORD",
      defaultCaption: "Password",
      isMandatory: true,
    },
    {
      fieldId: "2",
      fieldName: "email",
      fieldValueType: "EMAIL",
      defaultCaption: "Email",
      isMandatory: true,
    },
    {
      fieldId: "4",
      fieldName: "age",
      fieldValueType: "INT",
      defaultCaption: "Age",
      isMandatory: true,
    },
    {
      fieldId: "6",
      fieldName: "birth",
      fieldValueType: "DATE",
      defaultCaption: "bith",
      isMandatory: true,
    },
    {
      fieldId: "5",
      fieldName: "state",
      fieldValueType: "DROPDOWN",
      defaultCaption: "State",
      isMandatory: true,
    },
    {
      fieldId: "7",
      fieldName: "file",
      fieldValueType: "FILE",
      defaultCaption: "Role",
      isMandatory: true,
      enableImageView: true,
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Loader isAuthLoader={false} />
      ) : (
        <Fragment>
          {/* Header */}
          <Header headerLabel={"User Profile"} />

          {/* Profile Photo */}
          <div className="flex justify-center">
            <div className="flex justify-center w-fit relative">
              <Avatar className="h-[200px] w-[200px] rounded-full overflow-hidden bg-gray-200 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-shadow duration-200">
                <AvatarImage
                  loading="lazy"
                  src={profilePhoto}
                  alt={"profile"}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback>
                  <img
                    src={defaultImg}
                    alt="fallback"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-12 right-[-10px] h-8 w-8 bg-main hover:bg-main rounded-full shadow-md"
                onClick={() =>
                  document.getElementById("profile-photo-input")?.click()
                }
              >
                <Pencil className="w-4 h-4 text-white" />
                <input
                  type="file"
                  id="profile-photo-input"
                  accept="image/*"
                  className="hidden"
                  {...form.register("profilePicture", {
                    onChange: (e) => handlePhotoChange(e),
                  })}
                />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="absolute top-24 right-[-15px] h-8 w-8 bg-red-100 rounded-full shadow-md hover:bg-red-100"
                onClick={handleDeleteProfilePhoto}
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>

          {/* User Profile Form */}
          <div className="py-5">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-between h-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
                  {loginFormFields.map((item) => (
                    <UseRenderFields
                      key={item.fieldId}
                      item={item}
                      form={form}
                      errors={errors as any}
                      dropdownOptionsMap={dropdownOptionsMap}
                    />
                  ))}
                </div>

                <div className="sm:col-span-full flex gap-2 justify-end my-5">
                  <Button
                    type="button"
                    variant="outline"
                    className="border bg-background hover:bg-accent text-primary border-primary"
                    onClick={handleCancelButton}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="main"
                    disabled={!isDirty || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default UserProfile;
