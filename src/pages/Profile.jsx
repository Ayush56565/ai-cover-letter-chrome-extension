import React from "react";
import { MdArrowBack } from "react-icons/md";
import { PAGES } from "../utils/pages";
import { ToastContainer, toast } from "react-toastify";
import { saveData } from "../utils/localStorage";

function Profile({ setPage, setOpenAIKey, setResume, resume, openAIKey }) {
  const handleSubmt = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedResume = formData.get("resume");

    try {
      setResume(updatedResume);
      saveData("resume", updatedResume);
      toast.success("Saved successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error saving data.");
      console.error(error);
      toast.error("Error saving. Please try again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };


  // const [text, setText] = useState('');

  // const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();

  //     reader.onload = async (e) => {
  //         const buffer = e.target.result;
  //         try {
  //             const data = await pdfParse(buffer);
  //             setText(data.text);
  //         } catch (error) {
  //             console.error('Error parsing PDF:', error);
  //         }
  //     };

  //     reader.readAsArrayBuffer(file);
  // };

  return (
    <div className="flex flex-col  mx-5">
      <div className="flex flex-row justify-between my-3 items-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button
          onClick={() => setPage(PAGES.GENERATOR)}
          className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
        >
          <MdArrowBack className="text-[150%] text-gray-500" />
        </button>
      </div>

      <form className="flex-col" onSubmit={handleSubmt}>
        <div className="mb-6">
          <label
            htmlFor="resume"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Paste your resume below
          </label>
          <textarea
            id="resume"
            name="resume"
            defaultValue={resume}
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your resume..."
          ></textarea>

          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload your resume</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">Files should be uploaded in PDF format only.</p> */}

        </div>
        <div className="mb-6 text-center">
          <button
            type="submit"
            className="border-2 border-solid border-blue-500 text-blue-500 text-lg rounded-md px-5 py-2 hover:text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Profile;
