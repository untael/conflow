export default function useInterview(obj: any) {
    console.log('test ', JSON.stringify(obj))
    localStorage.setItem('test', JSON.stringify(obj));
}