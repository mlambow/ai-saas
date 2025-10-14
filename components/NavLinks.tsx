import Link from "next/link";

const Links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview", href: "/interview" },
    { label: "Resume", href: "/resume" }
]

export default function NavLinks() {
    return (
        <div className="flex space-x-4">
            {Links.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
}