export interface IComponentProps {
    contentTypeUID: string;
    name: string;
    onChange: (prop: { target: { name: string; value: any } }) => void;
}
