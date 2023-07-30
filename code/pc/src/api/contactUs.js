import server from './server';
class ContactUs {
    static getConsultings() {
        return server.get(`/about/advices`);
    }

    static contactUs(data) {
        return server.post(`/contactUs`, data);
    }

    static contact () {
        return server.get(`/contact`);
    }
}
export default ContactUs;