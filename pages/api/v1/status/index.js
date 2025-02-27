function status(request, response) {
  response.status(200).json({ chave: "uau, isto é magia" });
}

export default status;
