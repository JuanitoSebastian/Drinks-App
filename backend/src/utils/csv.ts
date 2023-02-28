import csvParser from 'csv-parse';
import csvStringify from 'csv-stringify';
import { createReadStream, createWriteStream, mkdir, openSync, closeSync, existsSync } from 'fs';
import path from 'node:path';

/**
 * Reads a given .csv file and returns contents as an array
 * @param directory Directory from root of package
 * @param filename Name of file to read
 * @throws Read stream errors and csv-pare errors
 * @returns An array containing all rows of .csv (including header row)
 */
const readCsvFile = async (directory: string, filename: string): Promise<unknown[]> => {
  const pathToFile = path.join(__dirname, '..', '..', directory, filename);

  if (!existsSync(pathToFile)) {
    return [];
  }

  const records: unknown[] = [];
  const stream = createReadStream(pathToFile);

  stream.on('error', (error) => {
    stream.close();
    throw error;
  });

  const parser = stream.pipe(csvParser.parse());

  for await (const record of parser) {
    records.push(record);
  }

  return records;

};

/**
 * Writes given data to a .csv file
 * @param directory Directory from root of package
 * @param filename Name of file to write
 * @param header Header row values for .csv file
 * @param data Data to write
 * @throws Mkdir errors, write stream errors and csv-stringify errors
 */
const writeCsvFile = (directory: string, filename: string, header: string[], data: unknown[]) => {
  mkdir(path.join(__dirname, '..', '..', directory), { recursive: true }, (error) => {
    if (error) {
      throw error;
    }
  });

  const writableStream = createWriteStream(path.join(__dirname, '..', '..', directory, filename));
  const stringifier = csvStringify.stringify({ header: true, columns: header });
  for (const row of data) {
    stringifier.write(row);
  }
  stringifier.pipe(writableStream);
};

/**
 * Overwrites a given file with a new empty file
 * @param directory Directory from root of package
 * @param filename Name of file to clear
 * @throws Close sync and open sync errors
 */
const clearCsvFile = (directory: string, filename: string) => {
  closeSync(openSync(path.join(__dirname, '..', '..', directory, filename), 'w'));
};

export default {
  readCsvFile,
  writeCsvFile,
  clearCsvFile
};