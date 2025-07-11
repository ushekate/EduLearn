import RootStudentsLayout from "../components/RootStudentsLayout";

export default function RootLayout({ children }) {
    return (
        <RootStudentsLayout>
            <main>
                {children}
            </main>
        </RootStudentsLayout>
    )
}