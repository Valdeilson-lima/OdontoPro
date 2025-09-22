export function formatPhone(phone: string) {
    // Remove todos os caracteres que não são dígitos
    const cleaned = phone.replace(/\D/g, "");
    // Formatar o número como (XX) XXXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}


export function unformatPhone(phone: string) {
    // Remove todos os caracteres que não são dígitos
    return phone.replace(/\D/g, "");
}
