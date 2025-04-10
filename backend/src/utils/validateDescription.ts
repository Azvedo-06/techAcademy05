export function validateBookDescription(description: string): void {
  if (!description || description.length < 10) {
    throw "Descrição do livro deve ter no mínimo 10 caracteres";
  }
}

export function validateAuthorBio(bio: string): void {
  if (!bio || bio.length < 10) {
    throw "Biografia do autor deve ter no mínimo 10 caracteres";
  }
}
