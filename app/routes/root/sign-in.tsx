import { useEffect, useState } from "react";
import { Link, redirect } from "react-router";
import { loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

export async function clientLoader() {
    try {
        const user = await account.get();

        if(user.$id) return redirect("/");
    } catch(e) {
        console.log("Error during clientLoader in sign-in.tsx: ", e);
    }
}


const SignIn = () => {
    const [ButtonComponent, setButtonComponent] = useState<any>(null);

    useEffect(() => {
        import("@syncfusion/ej2-react-buttons").then((pkg) => {
            setButtonComponent(() => pkg.ButtonComponent);
        });
    }, []);

    if (!ButtonComponent) return null;

    return (
        <main className="auth">
            <section className="glassmorphism flex-center px-6 w-full h-full">
                <div className="sign-in-card">
                    <header className="header">
                        <Link to="/">
                            <img
                                src="/assets/icons/logo.svg"
                                alt="logo"
                                className="w-[30px] h-[30px]"
                            />
                        </Link>
                        <h1 className="p-28-bold text-dark-100">TourVisto</h1>
                    </header>

                    <article>
                        <h2 className="p-28-semibold text-dark-100 text-center mb-4">
                            Start Your Travel Journey
                        </h2>

                        <p className="p-18-regular text-center text-gray-100 !leading-7">
                            Sign in with Google to manage destinations, itineraries, and user
                            activity with ease.
                        </p>
                    </article>
                    <ButtonComponent
                        type="button"
                        iconCss="e-seacrch-icon"
                        className="button-class !h-11 !w-full"
                        onClick={loginWithGoogle}
                    >
                        <img
                            src="/assets/icons/google.svg"
                            className="size-5"
                            alt="google"
                        />
                        <span className="p-18-semibold text-white">Sign in with Google</span>
                    </ButtonComponent>
                </div>
            </section>
        </main>
    );
};

export default SignIn;
