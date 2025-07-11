import RootTeachersLayout from "../components/RootTeacherLayout"

export default function RootLayout({ children }) {
    return (
        <RootTeachersLayout>
            <main>
                {children}
            </main>
        </RootTeachersLayout>
    )
}