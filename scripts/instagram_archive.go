package main

import (
	"encoding/csv"
	"errors"
	"flag"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"
)

var (
	accounts = []string{"kategonc", "visuartist"}
	realms   = []string{"studio", "orchard", "mirror", "practice", "play"}
)

func main() {
	if len(os.Args) < 2 {
		usage()
		os.Exit(2)
	}

	switch os.Args[1] {
	case "init":
		if err := runInit(os.Args[2:]); err != nil {
			fail(err)
		}
	case "add":
		if err := runAdd(os.Args[2:]); err != nil {
			fail(err)
		}
	default:
		usage()
		os.Exit(2)
	}
}

func usage() {
	fmt.Fprintf(os.Stderr, `instagram_archive is a tiny local organizer for Kate's Instagram references.

Usage:
  go run ./scripts/instagram_archive.go init [--root archive]
  go run ./scripts/instagram_archive.go add --src PATH --realm REALM [--account NAME] [--url URL] [--notes TEXT] [--root archive] [--move]

Accounts:
  kategonc
  visuartist

Realms:
  studio
  orchard
  mirror
  practice
  play
`)
}

func runInit(args []string) error {
	fs := flag.NewFlagSet("init", flag.ContinueOnError)
	root := fs.String("root", "archive", "archive root")
	fs.SetOutput(io.Discard)
	if err := fs.Parse(args); err != nil {
		return err
	}

	dirs := []string{
		filepath.Join(*root, "raw"),
		filepath.Join(*root, "curated"),
	}

	for _, account := range accounts {
		dirs = append(dirs, filepath.Join(*root, "raw", account))
	}
	for _, realm := range realms {
		dirs = append(dirs, filepath.Join(*root, "curated", realm))
	}

	for _, dir := range dirs {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return fmt.Errorf("create %s: %w", dir, err)
		}
	}

	catalogPath := filepath.Join(*root, "catalog.csv")
	if _, err := os.Stat(catalogPath); errors.Is(err, os.ErrNotExist) {
		file, err := os.Create(catalogPath)
		if err != nil {
			return fmt.Errorf("create catalog: %w", err)
		}
		defer file.Close()

		writer := csv.NewWriter(file)
		if err := writer.Write([]string{
			"timestamp",
			"account",
			"realm",
			"filename",
			"source_path",
			"curated_path",
			"source_url",
			"notes",
		}); err != nil {
			return fmt.Errorf("write catalog header: %w", err)
		}
		writer.Flush()
		if err := writer.Error(); err != nil {
			return fmt.Errorf("flush catalog header: %w", err)
		}
	}

	fmt.Printf("initialized archive at %s\n", *root)
	return nil
}

func runAdd(args []string) error {
	fs := flag.NewFlagSet("add", flag.ContinueOnError)
	root := fs.String("root", "archive", "archive root")
	src := fs.String("src", "", "source file")
	account := fs.String("account", "", "account name")
	realm := fs.String("realm", "", "realm name")
	url := fs.String("url", "", "source post URL")
	notes := fs.String("notes", "", "notes")
	move := fs.Bool("move", false, "move instead of copy")
	fs.SetOutput(io.Discard)
	if err := fs.Parse(args); err != nil {
		return err
	}

	if *src == "" {
		return errors.New("missing --src")
	}
	if *realm == "" {
		return errors.New("missing --realm")
	}
	if !contains(realms, *realm) {
		return fmt.Errorf("unsupported realm %q", *realm)
	}

	resolvedAccount := *account
	if resolvedAccount == "" {
		resolvedAccount = inferAccount(*src)
	}
	if resolvedAccount == "" {
		return errors.New("missing --account and could not infer it from --src")
	}
	if !contains(accounts, resolvedAccount) {
		return fmt.Errorf("unsupported account %q", resolvedAccount)
	}

	absSrc, err := filepath.Abs(*src)
	if err != nil {
		return fmt.Errorf("resolve source path: %w", err)
	}
	info, err := os.Stat(absSrc)
	if err != nil {
		return fmt.Errorf("stat source file: %w", err)
	}
	if info.IsDir() {
		return fmt.Errorf("source path %s is a directory", absSrc)
	}

	destDir := filepath.Join(*root, "curated", *realm)
	if err := os.MkdirAll(destDir, 0o755); err != nil {
		return fmt.Errorf("create destination directory: %w", err)
	}

	destPath := filepath.Join(destDir, uniqueFilename(destDir, filepath.Base(absSrc)))
	if *move {
		if err := os.Rename(absSrc, destPath); err != nil {
			return fmt.Errorf("move file: %w", err)
		}
	} else {
		if err := copyFile(absSrc, destPath); err != nil {
			return fmt.Errorf("copy file: %w", err)
		}
	}

	if err := appendCatalog(
		filepath.Join(*root, "catalog.csv"),
		[]string{
			time.Now().Format(time.RFC3339),
			resolvedAccount,
			*realm,
			filepath.Base(destPath),
			absSrc,
			destPath,
			*url,
			*notes,
		},
	); err != nil {
		return err
	}

	fmt.Printf("%s -> %s\n", absSrc, destPath)
	return nil
}

func appendCatalog(path string, record []string) error {
	file, err := os.OpenFile(path, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0o644)
	if err != nil {
		return fmt.Errorf("open catalog: %w", err)
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	if err := writer.Write(record); err != nil {
		return fmt.Errorf("write catalog row: %w", err)
	}
	writer.Flush()
	if err := writer.Error(); err != nil {
		return fmt.Errorf("flush catalog row: %w", err)
	}
	return nil
}

func copyFile(src, dest string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer func() {
		_ = out.Close()
	}()

	if _, err := io.Copy(out, in); err != nil {
		return err
	}
	return out.Sync()
}

func inferAccount(path string) string {
	lower := strings.ToLower(filepath.ToSlash(path))
	for _, account := range accounts {
		if strings.Contains(lower, "/"+account+"/") || strings.HasSuffix(lower, "/"+account) {
			return account
		}
	}
	return ""
}

func uniqueFilename(dir, name string) string {
	ext := filepath.Ext(name)
	base := strings.TrimSuffix(name, ext)
	candidate := name
	index := 2

	for {
		if _, err := os.Stat(filepath.Join(dir, candidate)); errors.Is(err, os.ErrNotExist) {
			return candidate
		}
		candidate = fmt.Sprintf("%s-%d%s", base, index, ext)
		index++
	}
}

func contains(list []string, value string) bool {
	for _, item := range list {
		if item == value {
			return true
		}
	}
	return false
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, "error:", err)
	os.Exit(1)
}
