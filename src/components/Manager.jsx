import React, { useState, useRef, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineDelete } from "react-icons/ai";

const Manager = () => {
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [eyeToggle, setEyeToggle] = useState(false);
    const [passwordArr, setPasswordArr] = useState([]);
    const [copiedCell, setCopiedCell] = useState(null); // To track the copied cell
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        site: "",
    });

    // Handler function when the button is clicked
    const handleCopy = (text, index, field) => {
        toast.success('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
        navigator.clipboard.writeText(text);
        setCopiedCell({ index, field });
        setTimeout(() => {
            setCopiedCell(null);
        }, 100); // Highlight the copied icon 
    };
    

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArr(JSON.parse(passwords));
        }
    }, []);

    const handleToggle = () => {
        setEyeToggle(!eyeToggle);
        passwordRef.current.type = eyeToggle ? "password" : "text";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { site, username, password } = form;

        if (!site.trim() || !username.trim() || !password.trim()) {
            alert("Make sure to enter all the required fields");
            return;
        }

        const newPassword = { site, username, password };
        setPasswordArr((prevPasswords) => {
            const updatedPasswords = [...prevPasswords, newPassword];
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            return updatedPasswords;
        });

        setForm({ site: "", username: "", password: "" });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let error = "";

        // Validate username (alphanumeric only)
        if (name === "username") {
            if (!/^[a-zA-Z0-9]+$/.test(value)) {
                error = "Username must be alphanumeric.";
            }
        }

        // Validate password (no spaces)
        if (name === "password") {
            if (value.includes(" ")) {
                error = "Password cannot contain spaces.";
            }
        }

        // Validate site (valid URL format)
        if (name === "site") {
            if (value && !/^https?:\/\/[^\s]+$/.test(value)) {
                error = "Please enter a valid URL.";
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this password?")) {
            const updatedPasswordArr = passwordArr.filter((_, idx) => idx !== index);
            setPasswordArr(updatedPasswordArr);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArr));
            toast.info("Password deleted successfully!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
            });
        }
    };

    const handleEdit = (index) => {
        if((form.site !== "" || form.username !== "" || form.password !== ""))
        {
            if(window.confirm("Do you want to discard your current changes?") === true){
                const { site, username, password } = passwordArr[index];
                setForm({ site, username, password });

                const updatedPasswordArr = passwordArr.filter((_, idx) => idx !== index);
                setPasswordArr(updatedPasswordArr);
                localStorage.setItem("passwords", JSON.stringify(updatedPasswordArr));
            }
            
        }
        else
        {
            const { site, username, password } = passwordArr[index];
            setForm({ site, username, password });

            const updatedPasswordArr = passwordArr.filter((_, idx) => idx !== index);
            setPasswordArr(updatedPasswordArr);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArr));
        }
        
    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                closeButton={false}
                toastStyle={{
                    backgroundColor: '#ffffff',
                    color: '#3B81F6',
                    borderRadius: '100px',
                    width: 'fit-content',
                    padding: '0px 20px',
                    marginBottom: '50px'
                }}
            />
            <div className="h-full px-4 md:px-8 py-6">

                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-bold text-gray-900">
                            &lt;Pass<span className="text-blue-500">Op</span>/&gt;
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Your own <span className="text-blue-500">one-place</span> password
                            manager
                        </p>
                    </div>

                    {/* Input Fields */}
                    <form onSubmit={handleSubmit}>
                        <div className="w-full flex flex-col gap-3">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="site"
                                value={form.site}
                                placeholder="Enter the website URL"
                                className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            {errors.site && (
                                <p className="text-red-500 text-xs pl-4">{errors.site}</p>
                            )}

                            <div className="flex gap-3">
                                <div className="w-1/2 sm:w-2/3">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        placeholder="Enter the username"
                                        className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-xs pl-4 mt-2">{errors.username}</p>
                                    )}
                                </div>
                                <div className="relative w-1/2 sm:w-1/3">
                                    <input
                                        onChange={handleChange}
                                        ref={passwordRef}
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        placeholder="Enter the password"
                                        className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs pl-4 mt-2">{errors.password}</p>
                                    )}
                                    {eyeToggle ? (
                                        <FaEye
                                            className="absolute top-3 right-4 text-blue-500 cursor-pointer"
                                            onClick={handleToggle}
                                        />
                                    ) : (
                                        <FaEyeSlash
                                            className="absolute top-3 right-4 text-blue-500 cursor-pointer"
                                            onClick={handleToggle}
                                        />
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 text-sm"
                                disabled={Object.values(errors).some((error) => error)}
                            >
                                Add Password
                            </button>
                        </div>
                    </form>

                    {/* Table */}
                    <div className="passwords mt-8">
                        <h2 className="font-semibold text-lg mb-2 text-gray-800">
                            Your Passwords:
                        </h2>
                        {passwordArr.length === 0 ? (
                            <p className="text-gray-500">No saved passwords to show</p>
                        ) : (
                            <div className="max-h-64 2xl:max-h-96 overflow-y-auto border rounded-lg shadow-md bg-white">
                                <table className="w-full text-sm text-gray-700">
                                    <thead className="sticky top-0 bg-blue-600 text-white">
                                        <tr>
                                            <th className="py-2 px-3">Website URL</th>
                                            <th className="py-2 px-3">Username</th>
                                            <th className="py-2 px-3">Password</th>
                                            <th className="py-2 px-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passwordArr.map((item, index) => (
                                            <tr key={index} className="border">
                                                <td className="py-2 px-3 border max-w-[200px]">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <p className="w-4/5 truncate" title={item.site}>{item.site}</p>
                                                        <span
                                                            className={`${copiedCell?.index === index && copiedCell?.field === 'site'
                                                                    ? "text-blue-600"
                                                                    : ""
                                                                }`}
                                                        >
                                                            {copiedCell?.index === index && copiedCell?.field === 'site' ? (
                                                                <IoCopy className="text-blue-600" />
                                                            ) : (
                                                                <IoCopyOutline
                                                                    onClick={() => handleCopy(item.site, index, 'site')}
                                                                    className="cursor-pointer"
                                                                />
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-3 border max-w-[200px]">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <p className="w-4/5 truncate" title={item.username}>{item.username}</p>
                                                        <span
                                                            className={`${copiedCell?.index === index && copiedCell?.field === 'username'
                                                                    ? "text-blue-600"
                                                                    : ""
                                                                }`}
                                                        >
                                                            {copiedCell?.index === index && copiedCell?.field === 'username' ? (
                                                                <IoCopy className="text-blue-600" />
                                                            ) : (
                                                                <IoCopyOutline
                                                                    onClick={() => handleCopy(item.username, index, 'username')}
                                                                    className="cursor-pointer"
                                                                />
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 border max-w-[200px]">
                                                    <div className="flex justify-between items-center gap-2">
                                                        <p className="w-4/5 truncate" title={item.password}>{item.password}</p>
                                                        <span
                                                            className={`${copiedCell?.index === index && copiedCell?.field === 'password'
                                                                    ? "text-blue-600"
                                                                    : ""
                                                                }`}
                                                        >
                                                            {copiedCell?.index === index && copiedCell?.field === 'password' ? (
                                                                <IoCopy className="text-blue-600" />
                                                            ) : (
                                                                <IoCopyOutline
                                                                    onClick={() => handleCopy(item.password, index, 'password')}
                                                                    className="cursor-pointer"
                                                                />
                                                            )}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 border max-w-[80px]">
                                                    <div className="flex gap-2 items-center justify-around">
                                                        <button
                                                            onClick={() => handleDelete(index)}
                                                            className="text-red-600 text-base"
                                                        >
                                                            <AiOutlineDelete />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(index)}
                                                            className="text-blue-600 text-base"
                                                        >
                                                            <FaRegEdit />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manager;
