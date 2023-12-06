import Main from "@/app/_components/Main";
import ImageContainer from "./_components/ImageContainer";
import ItemContainer from "./_components/ItemContainer";
import ItemDescription from "./_components/ItemDescription";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <Main />
            <div className="pt-6">
            <ItemContainer />
        </div>
        </>
        
    );
}
