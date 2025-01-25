export const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
  * Función para transformar coordenadas relativas de un padre a otro. Esto habría que moverlo a utils.
  * @param sourceContainer
  * @param targetContainer
  * @param x
  * @param y
  * @returns
  */
export const transformCoordinates = (
  sourceContainer: Phaser.GameObjects.Container,
  targetContainer: Phaser.GameObjects.Container,
  x: number,
  y: number
): { x: number; y: number } => {
  // Get the world transform matrix of the source container
  const sourceMatrix = sourceContainer.getWorldTransformMatrix();

  // Apply the matrix to the coordinates to get the world coordinates
  const worldX = sourceMatrix.tx + x * sourceMatrix.a + y * sourceMatrix.c;
  const worldY = sourceMatrix.ty + x * sourceMatrix.b + y * sourceMatrix.d;

  // Get the inverse world transform matrix of the target container
  const targetMatrix = targetContainer.getWorldTransformMatrix();
  const inverseTargetMatrix = targetMatrix.invert();

  // Apply the inverse matrix to the world coordinates to get the local coordinates of the target container
  const localX =
    inverseTargetMatrix.tx +
    worldX * inverseTargetMatrix.a +
    worldY * inverseTargetMatrix.c;
  const localY =
    inverseTargetMatrix.ty +
    worldX * inverseTargetMatrix.b +
    worldY * inverseTargetMatrix.d;

  return { x: localX, y: localY };
}
