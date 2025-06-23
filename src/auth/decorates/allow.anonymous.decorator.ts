export const AlllowAnanymous = () => {
    return (
        target: any,
        propertyKey: string,
        propertyDescription: PropertyDescriptor,
    ) => {
        console.log('The allow anaonys decorater is calles !', propertyKey);
    };
};
